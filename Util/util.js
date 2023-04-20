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
        if (result != undefined) {
          const conn = result.createConnection(process.env.MONGODB_URL);
          var Schema = moongose.Schema;


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
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (
          (result != undefined && threadId != null) ||
          threadId != undefined
        ) {
          const conn = result.createConnection(process.env.MONGODB_URL);

          var threadList = moongose.model("threadList", threadModel, "Threads");

          var queryPromise = threadList.findById(threadId).exec();
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

  createThread(subject, categoryID, description, document, email, departmentID) {
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
              isToxic: isToxOrNontox.includes('non-tox') ? false : true,
              departmentID: departmentID,
            };
            threadList.create(newDocument).then(function (result) {
              resolve(result);
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
  getAllThreadsByDepartmentID(departmentId) {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (
          (result != undefined && departmentId != null) ||
          departmentId != undefined
        ) {
          const conn = result.createConnection(process.env.MONGODB_URL);

          var threadList = moongose.model("threadList", threadModel, "Threads");
          var queryPromise = threadList
            .find({ departmentID: departmentId })
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

  //Get thread details by thread ID
  getResponsesByThreadID(threadId) {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (
          (result != undefined && threadId != null) ||
          threadId != undefined
        ) {
          const conn = result.createConnection(process.env.MONGODB_URL);

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

  createResponse(
    parentThreadId,
    replyHelpful,
    userName,
    datePosted,
    description,
    attachment,
    isToxic
  ) {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then(async (result) => {
        if (parentThreadId != undefined && parentThreadId != null) {
          // let collection = responsesSchema;
          let newDocument = {
            parentThreadId: parentThreadId,
            replyHelpful: replyHelpful,
            userName: userName,
            datePosted: datePosted,
            description: description,
            attachment: attachment,
            isToxic: isToxic,
          };
          var responseList = moongose.model(
            "responseList",
            responseModel,
            "Reply"
          );
          responseList.create(newDocument).then(function (result) {
            resolve(result);
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

