// Module file will have buisness logic and DB call

let utils = require('../Util/util');

module.exports = {

    //Get category list
    getAllCategories() {
        return new Promise((resolve, reject) => {
            utils.getAllCategories().then((result) => {
                resolve(result)
            });
        }).catch((err) => {
            reject(err);
        });
    },

    //Get list of deaprtments
    getAllDepartments() {
        return new Promise((resolve, reject) => {
            utils.getAllDepartments()
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    //Get list of threads by departmentID
    getThreadByCategoryId(categoryId) {
        return new Promise((resolve, reject) => {
            utils.getThreadByCategoryId(categoryId).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}