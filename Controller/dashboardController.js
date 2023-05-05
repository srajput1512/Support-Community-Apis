let dashboardModule = require('../Module/dashboardModule');

module.exports = {

    //Get all category list
    getAllCategories: (req, res, next) => {
        dashboardModule.getAllCategories().then((result) => {
            res.status(200).json({ Categories: result, statusCode: '200', status: 'Success' });
        }).catch((err) => {
            res.status(500).json({ message: err, statusCode: '500', status: 'Failure' });
        });
    },


    //Get list of deaprtments
    getAllDepartments: (req, res, next) => {
        dashboardModule.getAllDepartments().then((result) => {
            res.send(result);

        }).catch((err) => {
            res.send("Unable to fetch data");
        });
    },

    //Get all threads by department id 
    getThreadByCategoryId: (req, res, next) => {
        let categoryId = req.query.categoryId;
        dashboardModule.getThreadByCategoryId(categoryId).then((result) => {
            res.status(200).json({ Thread: result, statusCode: '200', status: 'Success' });

        }).catch((err) => {
            res.status(500).json({ message: err, statusCode: '500', status: 'Failure' });
        });
    },
}