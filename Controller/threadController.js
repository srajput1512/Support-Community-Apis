module.exports = {

  //Create Thread
  createThread: (req, res, next) => {
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
        .createThread(subject, categoryID, description, document, email, userId, departmentID, postedDateTime)
        .then((result) => {
          res.send(result);
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
    let threadId = req.body.threadId;
    let replyHelpful = req.body.replyHelpful;
    let userId = req.body.userId;
    let postedDateTime = req.body.postedDateTime;
    let description = req.body.description;
    let document = req.body.document;

    let threadModule = require("../Module/threadModule");

    threadModule.createResponse(threadId, replyHelpful, userId, postedDateTime, description, document)
      .then((result) => {
        res.send("Response saved successfully");
      })
      .catch((err) => {
        res.send("Unable to create thread");
      });
  }

};
