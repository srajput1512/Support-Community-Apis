const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const categoryModel = require("../Schemas/categoriesSchema");
const departmentModel = require("../Schemas/departmentSchema");
const UserModel = require("../Schemas/userSchema");
const PostThreadModel = require("../Schemas/createThreadSchema");
const PostThreadReplyModel = require("../Schemas/createResponseSchema");
const likesSchema = require("../Schemas/LikesSchema");
const responseLikesSchema = require("../Schemas/responseLikesSchema");
const { spawn } = require("child_process");
const path = require("path");

module.exports = {
  //Check Connection establish
  establishDbConnection() {
    return new Promise((resolve) => {
      mongoose
        .connect(process.env.MONGODB_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(async (db) => {
          if (db) {
            resolve(db);
          }
        });
    }).catch((err) => {
      reject(err);
    });
  },

  //Get all category list
  getAllCategories() {
    return new Promise(async (resolve) => {
      const categories = await categoryModel.find();
      resolve(categories);
    }).catch((err) => {
      reject(err);
    });
  },

  postThread(threadData) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [path.join(__dirname, `../python-ml/app.py`), threadData.description]);
      if (threadData.email) {
        const pythonProcessAdmin = spawn('python', [path.join(__dirname, `../python-ml/index.py`), threadData.description]);

        pythonProcessAdmin.stdout.on('data', (data) => {
          const response = JSON.parse(data.toString());
          const departmentName = response.department;
          departmentModel.find({ departmentName: departmentName })
            .then((department) => {
              if (department) {
                const departMentemail = department[0].email;
                threadData.departMentemail = departMentemail;
              } else {
                console.log(`Department with name ${departmentName} not found`);
              }
            })
            .catch((err) => {
              console.error(`Error fetching department: ${err}`);
            });
        });
      }

      pythonProcess.stdout.on('data', (data) => {
        const output = JSON.parse(data);
        threadData.isToxic = output.toxic;
        const newPost = new PostThreadModel(threadData);
        newPost.save().then((savedPost) => {
          if (threadData.departMentemail) {
            console.log(threadData.departMentemail);
            savedPost.departmentEmail = threadData.departMentemail || null;
          }
          resolve(threadData);
        }).catch((err) => {
          reject(err);
        });
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
        reject(data);
      });
    });
  },



  //Get list of deaprtments
  getAllDepartments() {
    return new Promise(async (resolve) => {
      const departments = await departmentModel.find();
      resolve(departments);
    }).catch((err) => {
      reject(err);
    });
  },

  //Get thread details by department ID
  getThreadByCategoryId(categoryId) {
    return new Promise((resolve) => {
      const response = PostThreadModel.aggregate([
        {
          $match: {
            categoryID: categoryId,
            isToxic: false,
          },
        },
        {
          $lookup: {
            from: "User",
            localField: "userId",
            foreignField: "userId",
            as: "users",
          },
        },
        {
          $lookup: {
            from: "Reply",
            localField: "_id",
            foreignField: "parentThreadId",
            as: "replies",
          },
        },
        {
          $lookup: {
            from: "Likes",
            localField: "_id",
            foreignField: "parentThreadId",
            as: "LikeData"
          }
        }
      ]).exec();
      if (response) {
        resolve(response);
      }
    }).catch((err) => {
      reject(err);
    });
  },

  //Get thread details by thread ID
  getAllRepliesByThreadId(threadId) {
    return new Promise(async (resolve, reject) => {
      const result = await PostThreadModel.aggregate([
        {
          $match: {
            _id: new ObjectId(threadId),
          },
        },
        {
          $lookup: {
            from: "Reply",
            localField: "_id",
            foreignField: "parentThreadId",
            as: "replies",
          },
        },
        {
          $unwind: {
            path: "$replies",
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $lookup: {
            from: "User",
            localField: "replies.userId",
            foreignField: "userId",
            as: "replies.user",
          },
        },
        {
          $lookup: {
            from: "User",
            localField: "userId",
            foreignField: "userId",
            as: "user",
          },
        },
        { 
          $lookup: {
          from: "Likes",
          localField: "_id",
          foreignField: "parentThreadId",
          as: "LikeData"
        }
      },
        {
          $match: {
            "replies.isToxic": false,
          },
        },
        {
          $group: {
            _id: "$_id",
            subject: { $first: "$subject" },
            categoryID: { $first: "$categoryID" },
            document: { $first: "$document" },
            departmentID: { $first: "$departmentID" },
            isToxic: { $first: "$isToxic" },
            postedDateTime: { $first: "$postedDateTime" },
            userId: { $first: "$userId" },
            description: { $first: "$description" },
            user: { $first: "$user" },
            replies: { $push: "$replies" },
            replylikes: { $push: "$LikeData" },
          },
        },
      ]).exec();
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  },


  postThreadReply(threadReplyData) {
    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', [path.join(__dirname, `../python-ml/app.py`), threadReplyData.description]);

      pythonProcess.stdout.on('data', (data) => {
        const output = JSON.parse(data);
        threadReplyData.isToxic = output.toxic;
        const newPostReply = new PostThreadReplyModel(threadReplyData);
        newPostReply.save().then((savedPostReply) => {
          resolve(savedPostReply);
        }).catch((err) => {
          reject(err);
        });
      });

      pythonProcess.stderr.on('data', (data) => {
        console.error(`Python script error: ${data}`);
        reject(data);
      });
    });
  },

  /** POST USER DATA */
  postUser(userData) {
    return new Promise(async (resolve) => {
      const isUserExist = await UserModel.find({ userId: userData.userId });
      if (isUserExist.length === 0) {
        const newUser = new UserModel(userData);
        const savedUser = await newUser.save();
        resolve(savedUser);
      } else {
        resolve(isUserExist);
      }
    }).catch((err) => {
      reject(err);
    });
  },

  /** Get USER DATA */
  getLoggedInUser(userId) {
    return new Promise(async (resolve) => {
      const user = await UserModel.find({ userId: userId });
      resolve(user);
    }).catch((err) => {
      reject(err);
    });
  },

  postThreadLikes(data) {
    return new Promise(async (resolve) => {
      const newLikes = new likesSchema(data);
      const result = await newLikes.save();
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  },

  postResponseLikes(data) {
    return new Promise(async (resolve) => {
      const newLikes = new responseLikesSchema(data);
      const result = await newLikes.save();
      resolve(result);
    }).catch((err) => {
      reject(err);
    });
  },
};
