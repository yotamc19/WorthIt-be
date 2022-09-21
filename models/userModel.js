const User = require('../schemas/userSchema');

// const getFullUsersList = async () => {
//     const list = await User.find({});
//     return list;
// }

const getUserById = async (id) => {
    const res = await User.find({ _id: id });
    return res;
}

const addUser = async (user) => {
    const data = await user.save();
    return data;
}

const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

const updateUserById = async (id, updatedUser) => {
    const doc = await User.findOneAndUpdate({ _id: id }, updatedUser, { new: true });
    return doc;
}

const getUserByEmail = async (email) => {
    const res = await User.find({ email });
    return res;
}

module.exports = { validateEmail, addUser, getUserById, updateUserById, getUserByEmail };