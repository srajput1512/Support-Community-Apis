var dashboardController = require('../Controller/dashboardController');

module.exports = (app) => {

    app.route('/getAllCategories').get(dashboardController.getAllCategories);

}
