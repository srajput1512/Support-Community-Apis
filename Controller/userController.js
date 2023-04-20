module.exports = {
    postUser: (req, res, next) => {
        let userId = req.body.userId;
        let userName = req.body.userName;
        let userMsisdn = req.body.userMsisdn;
        let userEmail = req.body.userEmail;

        let userModule = require("../Module/userModule");
        {
            userModule
                .postUser(userId, userEmail, userMsisdn, userName)
                .then((result) => {
                    res.json(req.body);
                })
                .catch((err) => {
                    res.json("Failed to post user data");
                });
        }
    },

};
