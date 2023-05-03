const userModule = require("../Module/userModule");

module.exports = {
    postUser: (req, res, next) => {
        const userData = req.body;      
        {
            userModule.postUser(userData)
                .then((result) => {
                    res.json(req.body);
                })
                .catch((err) => {
                    res.json("Failed to post user data");
                });
        }
    },


   getLoggedInUser : async (req, res) => {
        try {
            const user = await userModule.getLoggedInUser();
            res.status(200).json({ User: user, statusCode: '200', status: 'Success' });
        } catch (error) {
            res.status(500).json({ message: error.message, statusCode: '500', status: 'Failure' });
        }
    }

};
