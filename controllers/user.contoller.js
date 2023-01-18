const User = require('../models/user')


exports.createUser = (req, res) => {
    User.create(req.body)
        .then(user =>
            res.send(user)
        )
}

exports.getUsers = (req, res) => {
    User.find()
        .then(users =>
            res.send(users)
        )
}