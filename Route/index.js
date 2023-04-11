var dashboardController = require("../Controller/dashboardController");
var threadController = require("../Controller/threadController");

module.exports = (app) => {
  app.route("/getAllCategories").get(dashboardController.getAllCategories);
  app.route("/getAllThreadsByThreadID").get(dashboardController.getAllThreadsByID);
  app.route("/getAllDepartments").get(dashboardController.getAllDepartments);
  app.route("/createThread").post(threadController.createThread);
  app.route("/getAllThreadsByDepartmentID").get(dashboardController.getAllThreadsByDepartmentID);
  app.route("/getResponsesByThreadID").get(threadController.getResponsesByThreadID);
};
