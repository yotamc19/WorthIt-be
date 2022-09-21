const express = require("express");
const router = express.Router();
const { validateBody, isNewUser, hashPass, isExistingUser, verifyPass, auth } = require('../middlewares/userMiddleware');
const Controller = require('../controllers/userController');

//useEffect for page refresh
router.get('/currentUser', auth, Controller.getUser)

//signup a new user
router.post('/signup', validateBody, isNewUser, hashPass, Controller.signUp)

//login an exiting user
router.post('/login', validateBody, isExistingUser, verifyPass, Controller.login);

//logout currently logged in user
router.get('/logout', Controller.logout);

//update a user
router.put('/', auth, validateBody, isNewUser, Controller.updateUser);

//update the password of the user
router.put('/update-password', auth, hashPass, Controller.updateUser);

module.exports = router;