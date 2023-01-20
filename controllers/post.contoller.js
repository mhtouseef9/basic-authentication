const Post = require('../models/post')
const multer = require('multer')

exports.createPost = async (req, res) => {
    let userId = req.user && req.user._id;
    req.body.userId = userId;
    let images = req.files;
    console.log(images);
    let imageUrls = uploadImage(images)
    req.body.imageURLs = imageUrls
    // console.log("req.body")
    // console.log(req.body)
    // console.log("imageURLs: " + imageUrls)

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

function uploadImage(images) {
    // create proper accessible
    console.log("uploaded file: " + images)
    return images;
}
