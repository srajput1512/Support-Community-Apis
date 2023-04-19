let utils = require('../Util/util');

module.exports = {

    createThread(subject,categoryID,description,document,email,userID,isToxic,departmentID){
        return new Promise((resolve, reject) => {
        
            utils.createThread(subject,categoryID,description,document,email,userID,isToxic,departmentID).then((err, result)=> {
                    if(result) {
                        resolve(result)
                    }else{
                        resolve(err);
                    }
            });
        }).catch((err) => {
            reject(err);
        });
    },

    getResponsesByThreadID(threadId){
        return new Promise((resolve, reject) => {
        
            utils.getResponsesByThreadID(threadId).then((err, result)=> {
                    if(result) {
                        resolve(result)
                    }else{
                        resolve(err);
                    }
            });
        }).catch((err) => {
            reject(err);
        });
    },

    createResponse(parentThreadId, replyHelpful, userName,datePosted,description,attachment,isToxic){
        return new Promise((resolve, reject) => {
        
            utils.createResponse(parentThreadId, replyHelpful, userName,datePosted,description,attachment,isToxic).then((err, result)=> {
                    if(result) {
                        resolve(true)
                    }else{
                        resolve(err);
                    }
            });
        }).catch((err) => {
            reject(err);
        });
    },


    
}