module.exports = {

  //Create Thread
  createThread: (req, res, next) => {
    let subject = req.body.subject;
    let categoryID = req.body.categoryID;
    let description = req.body.description;
    let document = req.body.document;
    let email = req.body.email;
    let  isToxic = req.body.isToxic;
    let userName = req.body.userName;
    let departmentID = req.body.departmentID;

    let threadModule = require("../Module/threadModule");
{
      threadModule
        .createThread(subject,categoryID,description,document,email,userName,isToxic,departmentID)
        .then((result) => {
          res.send("Thread created successfully");
        })
        .catch((err) => {
          res.send("Unable to create thread");
        });
    } 
  },

  //Get responses by thread ID 
  getResponsesByThreadID: (req, res, next) => {
    let threadId = req.query.threadId;
    let threadModule = require("../Module/threadModule");
    threadModule.getResponsesByThreadID(threadId).then((result) => {
      res.send(result);

  }).catch((err) => {
      res.send("Unable to fetch data");
  });

  },

  //Create response to main thread
  createResponse: (req, res, next) => {
    let parentThreadId =req.body.parentThreadId;
    let replyHelpful = req.body.replyHelpful;
    let userName = req.body.userName;
    let datePosted = req.body.datePosted;
    let description = req.body.description;
    let attachment = req.body.attachment;
    let isToxic = req.body.isToxic;

    let threadModule = require("../Module/threadModule");
    
    threadModule.createResponse(parentThreadId, replyHelpful, userName,datePosted,description,attachment,isToxic)
    .then((result) => {
      res.send("Response saved successfully");
    })
    .catch((err) => {
      res.send("Unable to create thread");
    });
    

  }
  
};
