const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { getUserByEmail, validateEmail, getUserById } = require('../models/userModel');

const validateBody = (req, res, next) => {
    const { email, password, repassword } = req.body;
    if (email && !validateEmail(email)) {
        res.status(400).send('Not a valid email address');
        return;
    }
    if (password && password.length < 6) {
        res.status(400).send('Password has to be at least 6 letters');
        return;
    }
    if (password && repassword && password !== repassword) {
        res.status(400).send('Passwords do not match');
        return;
    }
    next();
}

const isNewUser = async (req, res, next) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    console.log('user', user);
    if (user.length === 0 || user.length === 1 && user[0]._id == req.body.id) {
        next();
    } else {
        res.status(400).send('Email in use already');
    }
}

const isExistingUser = async (req, res, next) => {
    const { email } = req.body;
    const user = await getUserByEmail(email);
    if (user.length === 0) {
        res.status(400).send('User does not exists');
    } else {
        req.body.user = user[0];
        next();
    }
}

const hashPass = (req, res, next) => {
    const { password } = req.body;
    const saltRounds = 10;
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        req.body.password = hash;
        next();
    });
}

const verifyPass = async (req, res, next) => {
    const actualPass = req.body.user.password;
    const writenPass = req.body.password;
    bcrypt.compare(writenPass, actualPass, (err, result) => {
        if (err) {
            res.status(500).send(err);
            return;
        }
        if (result) {
            next();
            return;
        } else {
            res.status(400).send("Incorrrect Password");
        }
    });
}

const auth = async (req, res, next) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(401).send("Unauthorized");
            return;
        }
        if (decoded) {
            req.body.id = decoded.id;
            next();
            return;
        }
    });
}

const adminAuth = async (req, res, next) => {
    const { token } = req.cookies;
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            res.status(401).send("Unauthorized");
            return;
        }
        if (decoded) {
            req.body.id = decoded.id;
            const user = await getUserById(decoded.id);
            if (!user[0].isAdmin) {
                res.status(401).send("Unauthorized");
                return;
            }
            next();
            return;
        }
    });
}

module.exports = { validateBody, isNewUser, hashPass, isExistingUser, verifyPass, auth, adminAuth };