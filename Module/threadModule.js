let utils = require('../Util/util');

module.exports = {

    createThread(subject, categoryID, description, document, email, userId, departmentID, postedDateTime) {
       
        return new Promise((resolve, reject) => {
            utils.createThread(subject, categoryID, description, document, email, userId, departmentID, postedDateTime).then((err, result) => {
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

    getResponsesByThreadID(threadId) {
        return new Promise((resolve, reject) => {

            utils.getResponsesByThreadID(threadId).then((err, result) => {
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

    createResponse(threadId, replyHelpful, userId, postedDateTime, description, document) {

        return new Promise((resolve, reject) => {
            utils.createResponse(threadId, replyHelpful, userId, postedDateTime, description, document).then((err, result) => {
                if (result) {
                    resolve(true)
                } else {
                    resolve(err);
                }
            });
        }).catch((err) => {
            reject(err);
        });
    },



}