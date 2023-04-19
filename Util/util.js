const moongose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/MTNCommunityDB";
moongose.set("strictQuery", true);
const threadModel = require("../Schemas/threadSchema");
const responseModel = require("../Schemas/responseSchema");
const categoryModel = require("../Schemas/categoriesSchema");
const departmentModel = require("../Schemas/departmentSchema");

module.exports = {
  //Get all category list

  establishDbConnection() {
    return new Promise((resolve, reject) => {
      moongose
        .connect(uri, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then(async (db) => {
          if (db != undefined) {
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
          const conn = result.createConnection(uri);
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
          const conn = result.createConnection(uri);

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

  createThread(subject,categoryID,description,document,email,isToxic,departmentID) {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (result) {
          let newDocument = {
            subject: subject,
            categoryID: categoryID,
            description: description,
            document: document,
            email: email,
            isToxic: isToxic,
            departmentID: departmentID,
          };
          
          var threadList = moongose.model(
            threadModel,
            "Threads"
          );
          threadList.create(newDocument).then(function (result) {
            resolve(result);
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
          const conn = result.createConnection(uri);
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
          const conn = result.createConnection(uri);

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
          const conn = result.createConnection(uri);

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
          let collection = responsesSchema;
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
};
