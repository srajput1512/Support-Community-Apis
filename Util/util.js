const moongose = require("mongoose");
moongose.set("strictQuery", true);
const threadModel = require("../Schemas/threadSchema");
const createThreadSchema = require("../Schemas/createThreadSchema")
const responseModel = require("../Schemas/responseSchema");
const categoryModel = require("../Schemas/categoriesSchema");
const departmentModel = require("../Schemas/departmentSchema");
const createResponseSchema = require("../Schemas/createResponseSchema")
const path = require('path');
const User = require('../Schemas/userSchema');
const likesSchema = require('../Schemas/LikesSchema');
const PostThread = require("../Schemas/createResponseSchema")
const { spawn } = require('child_process');
const PostThreadReply = require("../Schemas/createResponseSchema")
/**
   * Run python myscript, pass in `-u` to not buffer console output
   * @return {ChildProcess}
*/
function runScript(text) {
  return pythonProcess = spawn('python', [path.join(__dirname, `../python-ml/app.py`), `${text}`]);
}


module.exports = {
  //Get all category list
  establishDbConnection() {
    return new Promise((resolve) => {
      moongose
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
      resolve(categories)
    }).catch((err) => {
      reject(err);
    });
  },

  //Get thread details by thread ID
  getAllThreadsByID(threadId) {
    var resultArray = [];
    return new Promise((resolve) => {
      this.establishDbConnection().then((result) => {
        if (
          (result != undefined && threadId != null) ||
          threadId != undefined
        ) {
          var threadList = moongose.model("threadList", threadModel, "Threads");
          var responseList = moongose.model(
            "responseList",
            responseModel,
            "Reply"
          );
          threadList.findById(threadId).then((res) => {
            resultArray.push(res);

            var resList = responseList
              .find({ parentThreadId: { $eq: resultArray[0]._id } })
              .exec();

            resList.then(function (replylist) {
              if (replylist) {
                resultArray[0].Reply.push(replylist);
              }
              resolve(resultArray);
            });
          });
        } else {
          resolve(err);
        }
      });
    }).catch((err) => {
      reject(err);
    });
  },

  postThread(threadData) {
    return new Promise((resolve, reject) => {
      let isToxOrNontox;
      const subprocess = runScript(`${threadData.description}`)
      subprocess.stdout.on('data', (data) => {
          console.log(data)
          isToxOrNontox = data.toString();
          threadData.isToxic = isToxOrNontox.includes('non-tox') ? false : true;
          const newPost = new PostThread(threadData);
          newPost.save().then((savedPost) => {
              resolve(savedPost);
          }).catch((error) => {
              reject(error);
          });
      });
    }).catch((err) => {
      reject(err);
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
    return new Promise(async (resolve) => {

      const response = await createThreadSchema.aggregate([
        {
            $match: {
                categoryID: categoryId,
                isToxic: false
            }
        },
        {
            $lookup: {
                from: "User",
                localField: "userId",
                foreignField: "userId",
                as: "users"
            }

        },
        {
            $lookup: {
                from: "Reply",
                localField: "_id",
                foreignField: "parentThreadId",
                as: "replies"
            }

        }
          ]).exec();
      if(response){
          resolve(response)
          }
      }).catch((err) => {
      reject(err);
    });
  },

  //Get thread details by thread ID
  getAllRepliesByThreadId(threadId) {
    return new Promise(async (resolve) => {
      const response = await createResponseSchema.aggregate([
        {
            $match: {
                _id: threadId,
                isToxic: false
            }
        },
        {
            $lookup: {
                from: "Reply",
                localField: "_id",
                foreignField: "parentThreadId",
                as: "replies"
            }
        },
        {
            $unwind: {
                path: "$replies",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "User",
                localField: "replies.userId",
                foreignField: "userId",
                as: "replies.user"
            }
        },
        {
            $lookup: {
                from: "User",
                localField: "userId",
                foreignField: "userId",
                as: "user"
            }
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
                replies: { $push: "$replies" }
            }
        }
    ]).exec();
    resolve(response);
    }).catch((err) => {
      reject(err);
    });
  },

  postThreadReply(threadReplyData) {

    return new Promise((resolve) => {
      let isToxOrNontox;
      const subprocess = runScript(`${threadReplyData.description}`)
      subprocess.stdout.on('data', (data) => {
          isToxOrNontox = data.toString();
          threadReplyData.isToxic = isToxOrNontox.includes('non-tox') ? false : true;
          const newPostReply = new PostThreadReply(threadReplyData);
          newPostReply.save().then((savedPostReply) => {
              resolve(savedPostReply);
          }).catch((error) => {
              reject(error);
          });
      });
    }).catch((err) => {
      reject(err);
    });
  },

  /** POST USER DATA */
  postUser(userData) {
    return new Promise(async (resolve) => {
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            resolve(savedUser);
    }).catch((err) => {
      reject(err);
    });
  },

   getLoggedInUser(){
    return new Promise(async (resolve) => {
      const user = await User.find();
            resolve(user);
    }).catch((err) => {
      reject(err);
    });
  },

  postThreadLikes(data){
      return new Promise(async (resolve) => {
        const newLikes = new likesSchema(data);
        const result = await newLikes.save();
        resolve(result);
      }).catch((err) => {
      reject(err);
      });
      }
};

