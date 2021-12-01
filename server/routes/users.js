const router = require('express').Router({ mergeParams: true });

const {
    getAllUsers,
    createUser,
    getUserLogin,
    changeUserPassword,
    logoutUser,
} = require('../controllers/userControllers');

router.route('/').get(getAllUsers).post(createUser);

router.route('/login').post(getUserLogin);

router.route('/changePassword').post(changeUserPassword);

router.route('/logout').post(logoutUser);

module.exports = router;
