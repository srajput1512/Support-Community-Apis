module.exports = {

  //Create Thread
  createThread: (req, res, next) => {
    let Subject = req.body.Subject;
    let CategoryID = parseInt(req.body.CategoryID);
    let Description = req.body.Description;
    let Document = req.body.Document;
    let Email = req.body.Email;
    let UserID = parseInt(req.body.UserID);
    let UserName = req.body.UserName;

    let threadModule = require("../Module/threadModule");

    if (
      Subject != undefined &&
      CategoryID != undefined &&
      Description != undefined &&
      Document != undefined &&
      Email != undefined &&
      UserID != undefined &&
      UserName != undefined
    ) {
      threadModule
        .createThread()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.send("Unable to create thread");
        });
    } else {
      res.send("Please provide all mandatory fields");
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

  }
  
};
