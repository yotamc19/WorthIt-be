const express = require("express");
const router = express.Router();
const { validateBody, isNewUser, hashPass, isExistingUser, verifyPass, auth } = require('../middlewares/userMiddleware');
const Controller = require('../controllers/userController');

//signup a new user
router.post('/signup', validateBody, isNewUser, hashPass, Controller.signUp)

//login an exiting user
router.post('/login', validateBody, isExistingUser, verifyPass, Controller.login);

//logout currently logged in user
router.get('/logout', Controller.logout);

//update a user
router.put('/:id', auth, validateBody, isNewUser, Controller.updateUser);

//update the password of the user
router.put('/:id/update-password', auth, hashPass, Controller.updateUser);

module.exports = router;