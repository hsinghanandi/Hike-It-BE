const router = require('express').Router({ mergeParams: true });

const { getAllHikes, postHike } = require('../controllers/saveHikeController');

router.route('/').get(getAllHikes).post(postHike);

module.exports = router;
