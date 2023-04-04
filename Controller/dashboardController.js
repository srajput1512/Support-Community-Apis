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


}