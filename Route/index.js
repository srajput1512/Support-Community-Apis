var dashboardController = require("../Controller/dashboardController");
var threadController = require("../Controller/threadController");
var userController = require("../Controller/userController");

module.exports = (app) => {
  app.route("/getAllCategories").get(dashboardController.getAllCategories); //done
  app.route("/postUser").post(userController.postUser);
  app.route("/getAllDepartments").get(dashboardController.getAllDepartments);
  app.route("/postThread").post(threadController.postThread);
  app.route("/getThreadByCategoryId").get(dashboardController.getThreadByCategoryId);
  app.route("/getAllRepliesByThreadId").get(threadController.getAllRepliesByThreadId);
  app.route("/postThreadReply").post(threadController.postThreadReply);
  app.route("/getLoggedInUser").get(userController.getLoggedInUser);
};
