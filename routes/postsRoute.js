const express = require("express");
const router = express.Router();
const { validateBody } = require('../middlewares/postsMiddleware');
const { auth, adminAuth } = require('../middlewares/userMiddleware');
const Controller = require('../controllers/postsController');

router.get('/', auth, Controller.getPostsList);

router.post('/', validateBody, adminAuth, Controller.addPost);

router.put('/', validateBody, adminAuth, Controller.updatePost);

router.delete('/', adminAuth, Controller.deletePost);

module.exports = router;