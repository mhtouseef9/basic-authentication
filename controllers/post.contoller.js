const Post = require('../models/post')
const jwt = require('jsonwebtoken')
 //Node.js natively does not load .env files, so we must utilize the dotenv package to load the file and expose the values via process.env.
require('dotenv').config();

exports.createPost = async (req, res) => {
    let userId = req.user && req.user._id;
    req.body.userId = userId;
        Post.create(req.body)
            .then(post =>
            {
                res.status(200).send(post);
            })
}

exports.getPostsByUser = (req, res) => {
    const { user_id } = req;
    Post.find({ user_id })
        .sort({createdAt: "desc"})
        .then(posts =>
            res.send(posts)
        )
}
