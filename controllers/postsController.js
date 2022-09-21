const Post = require('../schemas/postSchema');
const { getAllPosts, getPostById, createPost, updatePostById, deletePostById } = require('../models/postsModel');

const addPost = async (req, res) => {
    try {
        const { heading, text } = req.body;
        const post = new Post({
            heading,
            text
        });
        const data = await createPost(post);
        res.send(data);
    } catch (err) {
        res.status(400).send('Something went wrong');
    }
}

const getPostsList = async (req, res) => {
    try {
        const list = await getAllPosts();
        res.send(list);
    } catch (err) {
        res.status(400).send('Something went wrong');
    }
}

const updatePost = async (req, res) => {
    try {
        const doc = await updatePostById(req.params.id, req.body);
        if (!doc) {
            throw new Error();
        }
        res.send(doc);
    } catch (err) {
        res.status(400).send('No post with this id');
    }
}

const deletePost = async (req, res) => {
    try {
        await deletePostById(req.params.id);
        res.send('Post deleted succesfully');
    } catch (err) {
        res.status(400).send('No post with this id');
    }
}

module.exports = { addPost, getPostsList, updatePost, deletePost };