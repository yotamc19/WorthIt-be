const Post = require('../schemas/postSchema');

const getAllPosts = async () => {
    const list = await Post.find({});
    return list;
}

const getPostById = async (id) => {
    const res = await Post.find({ _id: id });
    return res;
}

const createPost = async (post) => {
    const data = await post.save();
    return data;
}

const updatePostById = async (id, updatedPost) => {
    const doc = await Post.findOneAndUpdate({ _id: id }, updatedPost, { new: true });
    return doc;
}

const deletePostById = async (id) => {
    await Post.findByIdAndDelete(id, (err, docs) => {
        if (docs) {
            return docs;
        }
    }).clone();
}

module.exports = { getAllPosts, getPostById, createPost, updatePostById, deletePostById };