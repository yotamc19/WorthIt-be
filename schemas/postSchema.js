const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
