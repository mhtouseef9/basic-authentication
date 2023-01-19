const Post = require('../models/post')
const jwt = require('jsonwebtoken')
 //Node.js natively does not load .env files, so we must utilize the dotenv package to load the file and expose the values via process.env.
require('dotenv').config();

exports.createPost = async (req, res) => {
    console.log("here in create post func.")
    let userId = req.user && req.user._id;
    console.log("userId: " + userId)
        // Post.create(req.body)
        //     .then(post =>
        //     {
        //         res.status(200).send(post);
        //     })
        res.status(200).send({});
}

exports.getPostsByUser = (req, res) => {
    const { user_id } = req;
    Post.find({ user_id })
        .then(posts =>
            res.send(posts)
        )
}

generatejwt = (user) => {
    const {email} = user;
    return jwt.sign(
        { user_id: user._id, email },
        process.env.JWT_SECRET_KEY
        // {
        //     expiresIn: "2h",
        // }
    );
}

userView = (user, token) => {
    return  {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        token: token
    };
}
