const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllUsers = (req, res) => {
    const query = userModel.find({});

    if (Object.keys(query).length) {
        res.status(500).json({
            status: 'ERROR',
            message: 'No users exists!',
        });
    } else {
        query
            .select('name _id') //  get all users with their username and ID
            .exec()
            .then((results) => {
                console.log('Getting all Users : ', results);

                // send user data based upon results
                // res.status(200).json({});
            })
            .catch((error) => res.status(500).json({ error: error }));
    }
};

const getUserLogin = async (req, res) => {
    const { email, password } = req.body;
    console.log('Incoming Login request for user', req.body);

    const user = await userModel.findOne({ email }).lean();

    if (!user) {
        return res.json({
            status: 'ERROR',
            message: 'Invalid Email!',
        });
    } else if (await bcrypt.compare(password, user.password)) {
        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET
        );

        // SEND USER DATA AFTER SUCCESSFUL SIGNING IN!
        // AS IN PROFILE, FAV HIKES, ETC.

        return res.json({
            status: 'SUCCESS',
            message: 'User Sign-In Successful!',
            userToken: token,
        });
    } else {
        return res.json({
            status: 'ERROR',
            message: 'Invalid Password!',
        });
    }
};

const createUser = async (req, res) => {
    const newUserEmail = await userModel.isEmailInUse(req.body.email);
    const password = await bcrypt.hash(req.body.password, 10);

    if (newUserEmail) {
        const newUser = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: password,
        });

        newUser
            .save()
            .then((result) => {
                console.log('USER CREATED WITH FOLLOWING DETAILS:', result);

                // send user data based upon results
                res.status(201).json({
                    status: 'SUCCESS',
                    message: 'USER CREATED SUCCESSFULLY!',
                });
            })
            .catch((error) => res.status(500).json({ error: error }));
    } else {
        return res.json({
            status: 'ERROR',
            message:
                'This email is already in use. Please use a different email address!',
        });
    }
};

const changeUserPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log('user change password:', user);

        const _id = user.id;

        const encryptedPassword = await bcrypt.hash(newPassword, 10);

        await userModel.updateOne(
            { _id },
            { $set: { password: encryptedPassword } }
        );

        res.status(200).json({
            status: 'SUCCESS',
            message: 'Password Changed SUCCESSFULLY!',
        });
    } catch (error) {
        res.json({
            status: 'ERROR',
            message: 'Unexpected Error Occured!',
        });
    }
};

const logoutUser = (req, res) => {
    res.status(200).json({
        status: 'SUCCESS',
        message: 'Logout SUCCESSFUL!',
    });
};

module.exports = {
    getAllUsers,
    getUserLogin,
    createUser,
    changeUserPassword,
    logoutUser,
};
