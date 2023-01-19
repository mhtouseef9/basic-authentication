var mongoose = require('mongoose');
var Post = new mongoose.Schema({
    content: String,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userss',
        required:true
    },
    imageURLs: Array
    },
    { timestamps: true }
);
module.exports = mongoose.model(
    'posts', Post, 'posts');
