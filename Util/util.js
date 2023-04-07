const moongose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/MTNCommunityDB";
moongose.set("strictQuery", true);
const threadModel = require('../Schemas/threadSchema');

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

          var categories = moongose.model( "categories", categorySchema, "Category");
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
        if (result != undefined && threadId != null || threadId != undefined) { 
          const conn = result.createConnection(uri);
       
          var threadList = moongose.model( "threadList", threadModel, "Threads");

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



};
