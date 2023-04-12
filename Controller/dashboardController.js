module.exports = {

   //Get all category list
   getAllCategories: (req, res, next) => {

    let dashboardModule = require('../Module/dashboardModule');

    dashboardModule.getAllCategories().then((result) => {
        res.send(result);

    }).catch((err) => {
        res.send("Unable to fetch data");
    });

},

  //Get all threads by thread id 
  getAllThreadsByID: (req, res, next) => {

    let threadId = req.query.threadId;

    let dashboardModule = require('../Module/dashboardModule');

    dashboardModule.getAllThreadsByID(threadId).then((result) => {
        res.send(result);

    }).catch((err) => {
        res.send("Unable to fetch data");
    });

},

//Get list of deaprtments
getAllDepartments: (req, res, next) => {

    let dashboardModule = require('../Module/dashboardModule');

    dashboardModule.getAllDepartments().then((result) => {
        res.send(result);

    }).catch((err) => {
        res.send("Unable to fetch data");
    });

},

 //Get all threads by department id 
 getAllThreadsByDepartmentID: (req, res, next) => {

    let threadId = req.query.departmentId;

    let dashboardModule = require('../Module/dashboardModule');

    dashboardModule.getAllThreadsByDepartmentID(threadId).then((result) => {
        res.send(result);

    }).catch((err) => {
        res.send("Unable to fetch data");
    });

},

}