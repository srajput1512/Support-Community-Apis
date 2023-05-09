let utils = require('../Util/util');

module.exports = {

    postThread(threadData) {
        return new Promise((resolve, reject) => {
            utils.postThread(threadData).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            });
        });
    },

    getAllRepliesByThreadId(threadId) {
        return new Promise((resolve, reject) => {
            utils.getAllRepliesByThreadId(threadId)
                .then((replies) => {
                    resolve(replies);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    postThreadReply(threadReplyData) {
        return new Promise((resolve, reject) => {
            utils.postThreadReply(threadReplyData)
                .then((result) => {
                    resolve(result);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },

    postResponseLikes(data) {
        return new Promise((resolve, reject) => {
            utils.postResponseLikes(data).then((result) => {
                    resolve(result);
                }).catch((err) => {
                    reject(err);
                });
        });
    }
}