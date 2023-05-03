// Module file will have buisness logic and DB call

let utils = require('../Util/util');

module.exports = {

    //Get category list
    getAllCategories() {
        return new Promise((resolve, reject) => {

            utils.getAllCategories().then((err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    resolve(err);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    },

    //Get thread by thread ID
    getAllThreadsByID(threadId) {
        return new Promise((resolve, reject) => {

            utils.getAllThreadsByID(threadId).then((err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    resolve(err);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    },

    //Get list of deaprtments
    getAllDepartments() {
        return new Promise((resolve, reject) => {

            utils.getAllDepartments().then((err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    resolve(err);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    },

    //
    //Get list of threads by departmentID
    getThreadByCategoryId(categoryId) {
        return new Promise((resolve, reject) => {
            utils.getThreadByCategoryId(categoryId).then((err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    resolve(err);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    },
}