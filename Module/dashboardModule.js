// Module file will have buisness logic and DB call

let utils = require('../Util/util');

module.exports = {

      //Get employee list
      getAllCategories() {
        return new Promise((resolve, reject) => {
        
            utils.getAllCategories().then((err, result)=> {
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


    getAllThreadsByID(threadId) {
        return new Promise((resolve, reject) => {
        
            utils.getAllThreadsByID(threadId).then((err, result)=> {
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


}