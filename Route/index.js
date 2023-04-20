var dashboardController = require("../Controller/dashboardController");
var threadController = require("../Controller/threadController");
var userController = require("../Controller/userController");

module.exports = (app) => {
  app.route("/getAllCategories").get(dashboardController.getAllCategories);
  app.route("/postUser").post(userController.postUser);
  app.route("/getAllThreadsByThreadID").get(dashboardController.getAllThreadsByID);
  app.route("/getAllDepartments").get(dashboardController.getAllDepartments);
  app.route("/createThread").post(threadController.createThread);
  app.route("/getAllThreadsByCategoryID").get(dashboardController.getAllThreadsByCategoryID);
  app.route("/getResponsesByThreadID").get(threadController.getResponsesByThreadID);
  app.route("/createResponse").post(threadController.createResponse);
};
