let threadModule = require("../Module/threadModule");

module.exports = {

  //Create Thread
  postThread: (req, res, next) => {
    let threadData = req.body;
    {
      threadModule.postThread(threadData).then((result) => {
        res.send({ Thread: result, statusCode: '200', status: 'Success' });
      })
        .catch((err) => {
          res.status(500).json({ message: err.message, statusCode: '500', status: 'Failure' });
        });
    }
  },

  //Get responses by thread ID 
  getAllRepliesByThreadId: (req, res, next) => {
    let threadId = req.query.threadId;
    threadModule.getAllRepliesByThreadId(threadId).then((result) => {
      res.send({ ThreadReplies: result, statusCode: '200', status: 'Success' });
    }).catch((err) => {
      res.status(500).json({ message: err, statusCode: '500', status: 'Failure' });
    });
  },

  //Create response to main thread
  postThreadReply: (req, res, next) => {
    const threadReplyData = req.body;
    threadModule.postThreadReply(threadReplyData)
      .then((result) => {
        res.send({ ThreadReply: result, statusCode: '200', status: 'Success' });
      })
      .catch((err) => {
        res.send("Unable to create thread");
      });
  }
};
