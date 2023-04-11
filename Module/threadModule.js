let utils = require('../Util/util');

module.exports = {


    createThread(Subject, CategoryID,Description,Document,Email,UserID,UserName){
        return new Promise((resolve, reject) => {
        
            utils.createThread(Subject, CategoryID,Description,Document,Email,UserID,UserName).then((err, result)=> {
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
    }


    
}