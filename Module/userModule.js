let utils = require('../Util/util');

module.exports = {

    postUser(userId, userEmail, userMsisdn, userName) {
        return new Promise((resolve, reject) => {
            utils.postUser(userId, userEmail, userMsisdn, userName).then((err, result) => {
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