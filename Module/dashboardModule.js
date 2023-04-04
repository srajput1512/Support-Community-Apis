// Module file will have buisness logic and DB call

let utils = require('../Util/util');

module.exports = {

      //Get employee list
      getAllCategories() {
        return new Promise((resolve, reject) => {
        
            utils.establishDbConnection().then((err, result)=> {
                    if(result) {cd 
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