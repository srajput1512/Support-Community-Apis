let utils = require('../Util/util');

module.exports = {

    postThread(threadData) {
        return new Promise((resolve, reject) => {
            utils.postThread(threadData).then((err, result) => {
                if (result) {
                    resolve(result)
                } else {
                    reject(err);
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

    postThreadReply(threadReplyData) {

        return new Promise((resolve, reject) => {
            utils.postThreadReply(threadReplyData).then((err, result) => {
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