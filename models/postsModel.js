const Post = require('../schemas/postSchema');

const getAllPosts = async () => {
    const list = await Post.find({});
    return list;
}

const getPostById = async (postId) => {
    const res = await Post.find({ _id: postId });
    return res[0];
}

const createPost = async (post) => {
    const data = await post.save();
    return data;
}

const deletePostById = async (id) => {
    await Post.findByIdAndDelete(id, (err, docs) => {
        if (docs) {
            return docs;
        }
    }).clone();
}

module.exports = { getAllPosts, getPostById, createPost, deletePostById };