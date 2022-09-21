const User = require('../schemas/userSchema');
const jwt = require("jsonwebtoken");
const { addUser, updateUserById } = require('../models/userModel');
require("dotenv").config();

const signUp = async (req, res) => {
    try {
        const { email, password, firstName, lastName, phoneNumber } = req.body;
        const user = new User({
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
            isAdmin: false,
        });
        const data = await addUser(user);
        const token = jwt.sign({ id: data._id }, process.env.TOKEN_SECRET, { expiresIn: "2h" });
        res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000 });
        res.send({
            _id: data._id,
            email: data.email,
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
            isAdmin: false
        });
    } catch (err) {
        res.status(400).send('Something went wrong');
    }
}

const login = async (req, res) => {
    try {
        const token = jwt.sign({ id: req.body.user._id }, process.env.TOKEN_SECRET, { expiresIn: "2h" });
        res.cookie("token", token, { maxAge: 2 * 60 * 60 * 1000 });
        res.send({
            _id: req.body.user._id,
            email: req.body.user.email,
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            phoneNumber: req.body.user.phoneNumber,
            isAdmin: req.body.user.isAdmin,
        });
    } catch (err) {
        res.status(400).send('Something went wrong');
    }
}

const logout = async (req, res) => {
    try {
        res.clearCookie('token');
        res.send('Logout succesfully');
    } catch (err) {
        res.status(400).send('Something went wrong');
    }
}

// const getUser = async (req, res) => {
//     try {
//         let user = await getUserById(req.params.id);
//         user[0].password = '';
//         res.send(user[0]);
//     } catch (err) {
//         res.status(400).send('No user with this id');
//     }
// }

// const getUsersList = async (req, res) => {
//     try {
//         const list = await getFullUsersList();
//         res.send(list);
//     } catch (err) {
//         res.status(400).send('Something went wrong');
//     }
// }

const updateUser = async (req, res) => {
    try {
        const doc = await updateUserById(req.params.id, req.body);
        if (!doc) {
            throw new Error();
        }
        res.send(doc);
    } catch (err) {
        res.status(400).send('No user with this id');
    }
}

module.exports = { signUp, login, logout, updateUser };