const express = require("express");
const router = express.Router();
const { validateBody } = require('../middlewares/postsMiddleware');
const { auth, adminAuth } = require('../middlewares/userMiddleware');
const Controller = require('../controllers/postsController');

router.get('/', auth, Controller.getPostsList);

router.get('/:postId', auth, Controller.getPost);

router.post('/', validateBody, adminAuth, Controller.addPost);

router.delete('/:postId', adminAuth, Controller.deletePost);

module.exports = router;