const userModule = require("../Module/userModule");

module.exports = {
    postUser: (req, res, next) => {
        const userData = req.body;
        {
            userModule.postUser(userData)
                .then((result) => {
                    res.send({ User: result, statusCode: '200', status: 'Success' });
                })
                .catch((err) => {
                    res.json("Failed to post user data");
                });
        }
    },


    getLoggedInUser: async (req, res) => {
        userId = req.query.userId;
        try {
            const user = await userModule.getLoggedInUser(userId);
            res.status(200).json({ User: user, statusCode: '200', status: 'Success' });
        } catch (error) {
            res.status(500).json({ message: error.message, statusCode: '500', status: 'Failure' });
        }
    }

};
