var dashboardController = require('../Controller/dashboardController');

module.exports = (app) => {

    app.route('/getAllCategories').get(dashboardController.getAllCategories);

    app.route('/getAllThreadsByID').get(dashboardController.getAllThreadsByID);

}
