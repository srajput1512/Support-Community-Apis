let utils = require('../Util/util');

module.exports = {

    postThread(subject, categoryID, description, document, email, userId, departmentID, postedDateTime) {
       
        return new Promise((resolve, reject) => {
            utils.postThread(subject, categoryID, description, document, email, userId, departmentID, postedDateTime).then((err, result) => {
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

    getAllRepliesByThreadId(threadId) {
        return new Promise((resolve, reject) => {

            utils.getAllRepliesByThreadId(threadId).then((err, result) => {
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

    postThreadReply(threadId, replyHelpful, userId, postedDateTime, description, document) {

        return new Promise((resolve, reject) => {
            utils.postThreadReply(threadId, replyHelpful, userId, postedDateTime, description, document).then((err, result) => {
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