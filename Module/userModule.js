let utils = require('../Util/util');

module.exports = {

    postUser(userData) {
        return new Promise((resolve, reject) => {
            utils.postUser(userData).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    getLoggedInUser(userId) {
        return new Promise((resolve) => {
            utils.getLoggedInUser(userId).then((result) => {
                resolve(result)
            }).catch((err) => {
                reject(err);
            });
        });
    }
}