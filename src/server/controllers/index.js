var models  = require('../models');
var constants = require('./constants')
module.exports = {
    signUp: (req, res) => {
        console.log(req.body);
        let requestBody = req.body;
        models.User.findOne({where: {username: requestBody.username}}).then((user) => {
            if(user !== null) {
                res.status(constants.STATUS_CODE.CREATED).send({
                    "message": "User Existed."
                });
            }
        });
        models.User.create({
            username: requestBody.username,
            name: requestBody.name,
            password: requestBody.password
        }).then(() => {
            res.status(constants.STATUS_CODE.OK).send({
                "message": "success"
            });
        });
    },
}