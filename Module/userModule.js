let utils = require('../Util/util');

module.exports = {

    postUser(userData) {
        return new Promise((resolve, reject) => {
            utils.postUser(userData).then((err, result) => {
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

    getLoggedInUser(){
        return new Promise((resolve, reject) => {
            utils.getLoggedInUser().then((err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(err);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    }
}