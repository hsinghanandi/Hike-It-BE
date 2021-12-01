const router = require('express').Router({ mergeParams: true });
const users = require('./users');
const saveHike = require('./saveHike');

// const apiEndpointValidator = require('../middlewares/apiEndpointValidator');
// this middlerware will check for dynamic entered endpoints

router.use('/users', users);
router.use('/save-hike', saveHike);

module.exports = router;
