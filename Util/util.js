const moongose = require("mongoose");
moongose.set("strictQuery", true);
const threadModel = require("../Schemas/threadSchema");
const responseModel = require("../Schemas/responseSchema");
const categoryModel = require("../Schemas/categoriesSchema");
const departmentModel = require("../Schemas/departmentSchema");
const userModel = require("../Schemas/userSchema");
const path = require('path');
const { spawn } = require('child_process');
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
    return new Promise((resolve, reject) => {
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
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (result) {

          var categories = moongose.model(
            "categories",
            categoryModel,
            "Category"
          );
          var queryPromise = categories.find().exec();

          queryPromise.then(function (category) {
            resolve(category);
          });
        } else {
          resolve(err);
        }
      });
    }).catch((err) => {
      reject(err);
    });
  },

  //Get thread details by thread ID
  getAllThreadsByID(threadId) {
    var resultArray = [];
    return new Promise((resolve, reject) => {
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

  createThread(subject, categoryID, description, document, email, userId, departmentID, postedDateTime,) {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (result) {

          var threadList = moongose.model(
            'threadList',
            threadModel,
            "Threads"
          );

          const subprocess = runScript(`${description}`)
          subprocess.stdout.on('data', (data) => {
            let isToxOrNontox = (String(data));
            let newDocument = {
              subject: subject,
              categoryID: categoryID,
              description: description,
              document: document,
              email: email,
              userId: userId,
              isToxic: isToxOrNontox.includes('non-tox') ? false : true,
              departmentID: departmentID,
              postedDateTime: postedDateTime,
            };

            threadList.create(newDocument).then(function (result) {
              var res = [{
                "statusCode": "200",
                "isToxic": newDocument.isToxic
              }]
              resolve(res);
            });
          });
        }
      });
    }).catch((err) => {
      reject(err);
    });
  },

  //Get list of deaprtments
  getAllDepartments() {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (result != undefined) {
          const conn = result.createConnection(process.env.MONGODB_URL);
          var Schema = moongose.Schema;

          var departments = moongose.model(
            "departments",
            departmentModel,
            "Department"
          );
          var queryPromise = departments.find().exec();

          queryPromise.then(function (department) {
            resolve(department);
          });
        } else {
          resolve(err);
        }
      });
    }).catch((err) => {
      reject(err);
    });
  },

  //Get thread details by department ID
  getAllThreadsByCategoryID(categoryId) {
    var resultArray = [];
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (result && categoryId) {

          var threadList = moongose.model("threadList", threadModel, "Threads");
          var userList = moongose.model("userList", userModel, "User");
          threadList.find({ categoryID: categoryId }).then((res) => {
            resultArray.push(res);

            userList.find().exec().then(function (res) {
              var userArray = res;
              for (var i = 0; i < resultArray[0].length; i++) {
                for (var j = 0; j < userArray.length; j++) {
                  if (resultArray[0][i].userId == userArray[j].userId) {
                    resultArray[0][i].User.push(userArray[j]);
                  }
                }
              };
              resolve(resultArray[0])
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

  //Get thread details by thread ID
  getResponsesByThreadID(threadId) {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (result && threadId) {

          var responseList = moongose.model(
            "responseList",
            responseModel,
            "Reply"
          );

          var queryPromise = responseList
            .find({ parentThreadId: threadId })
            .exec();
          queryPromise.then(function (list) {
            resolve(list);
          });
        } else {
          resolve(err);
        }
      });
    }).catch((err) => {
      reject(err);
    });
  },

  createResponse(threadId, replyHelpful, userId, postedDateTime, description, document) {

    return new Promise((resolve, reject) => {
      this.establishDbConnection().then(async (result) => {
        if (threadId) {

          var responseList = moongose.model(
            "responseList",
            responseModel,
            "Reply"
          );

          const subprocess = runScript(`${description}`)
          subprocess.stdout.on('data', (data) => {
            let isToxOrNontox = (String(data));
            let newDocument = {
              parentThreadId: threadId,
              replyHelpful: replyHelpful,
              userId: userId,
              postedDateTime: postedDateTime,
              description: description,
              document: document,
              isToxic: isToxOrNontox.includes('non-tox') ? false : true,
            };
            responseList.create(newDocument).then(function (result) {
              resolve(result);
            });
          });

        }
      });
    }).catch((err) => {
      reject(err);
    });
  },

  /** POST USER DATA */
  postUser(userId, userEmail, userMsisdn, userName) {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (result) {
          let userDocument = {
            userId: userId,
            userEmail: userEmail,
            userName: userName,
            userMsisdn: userMsisdn
          };

          var userList = moongose.model(
            "userList",
            userModel,
            "User"
          );

          userList.find({ userMsisdn: userDocument.userMsisdn }).exec().then(function (data) {
            if (Object.keys(data).length === 0) {
              userList.create(userDocument).then(function (result) {
                resolve(userDocument);
              });
            } else {
              resolve(userDocument);
            }
          });
        }
      });
    }).catch((err) => {
      reject(err);
    });
  },
};

