const moongose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/MTNCommunityDB";
moongose.set("strictQuery", true);
const threadModel = require("../Schemas/threadSchema");
const responseModel = require("../Schemas/responseSchema");
const createThreadSchema = require("../Schemas/createThreadSchema");
const createThreadResponseSchema = require("../Schemas/createResponseSchema");
const responsesSchema = require("../Schemas/responseSchema");

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

          var categorySchema = new Schema({
            CategoryName: String,
          });

          var categories = moongose.model(
            "categories",
            categorySchema,
            "Category"
          );
          var queryPromise = categories.find().exec();

          queryPromise.then(function (category) {
            console.log(category);
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
            console.log(list);
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

  createThread(subject,categoryID,description,document,email,userName,isToxic) {
    return new Promise((resolve, reject) => {
      this.establishDbConnection().then((result) => {
        if (result != undefined) {
          let collection = createThreadSchema;
          let newDocument = {
            subject: subject,
            categoryID: categoryID,
            description: description,
            document: document,
            email: email,
            userName: userName,
            isToxic: isToxic,
          };
          var threadList = moongose.model(
            "threadList",
            responseModel,
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

          var departmentSchema = new Schema({
            departmentName: String,
          });

          var departments = moongose.model(
            "departments",
            departmentSchema,
            "Department"
          );
          var queryPromise = departments.find().exec();

          queryPromise.then(function (department) {
            console.log(department);
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
            console.log(list);
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
            console.log(list);
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
