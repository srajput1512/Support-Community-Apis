module.exports = {

  //Create Thread
  postThread: (req, res, next) => {
    let subject = req.body.subject;
    let categoryID = req.body.categoryID;
    let description = req.body.description;
    let document = req.body.document;
    let email = req.body.email;
    let userId = req.body.userId;
    let departmentID = req.body.departmentID;
    let postedDateTime = req.body.postedDateTime;

    let threadModule = require("../Module/threadModule");
    {
      threadModule
        .postThread(subject, categoryID, description, document, email, userId, departmentID, postedDateTime)
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send("Unable to create thread");
        });
    }
  },

  //Get responses by thread ID 
  getAllRepliesByThreadId: (req, res, next) => {
    let threadId = req.query.threadId;
    let threadModule = require("../Module/threadModule");
    threadModule.getAllRepliesByThreadId(threadId).then((result) => {
     res.send({ ThreadReplies: result, statusCode: '200', status: 'Success' }); 
    }).catch((err) => {
      res.status(500).json({ message: err, statusCode: '500', status: 'Failure' });
    });

  },

  //Create response to main thread
  postThreadReply: (req, res, next) => {
    let threadId = req.body.parentThreadId;
    let replyHelpful = req.body.replyHelpful;
    let userId = req.body.userId;
    let postedDateTime = req.body.postedDateTime;
    let description = req.body.description;
    let document = req.body.document;

    let threadModule = require("../Module/threadModule");

    threadModule.postThreadReply(threadId, replyHelpful, userId, postedDateTime, description, document)
      .then((result) => {
        res.send("Response saved successfully");
      })
      .catch((err) => {
        res.send("Unable to create thread");
      });
  }

};
