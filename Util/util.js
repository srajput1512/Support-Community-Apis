const moongose = require("mongoose");
const uri = "mongodb://127.0.0.1:27017/MTNCommunityDB";
moongose.set("strictQuery", true);


module.exports = {

    //Get all category list

establishDbConnection(){
    return new Promise((resolve, reject) => {
        var Schema = moongose.Schema;
        
    moongose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(async (db) => {
   
        const conn  = db.createConnection(uri)
 
        var categorySchema = new Schema({
            CategoryName : String
         });

        var categories = moongose.model('categories', categorySchema, 'Category');
        var queryPromise = categories.find().exec();
      
        queryPromise.then(function(category){
            console.log(category);
            resolve(category);
          })
      });
    
      }).catch((err) => {
          reject(err);
      });
}
}