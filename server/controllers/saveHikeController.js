const saveHikeModel = require('../models/saveHikeModel');

const getAllHikes = (req, res) => {
    const query = saveHikeModel.find({});

    query
        .exec()
        .then((results) => {
            {
                results && results.length
                    ? res.status(200).json({
                          status: 'SUCCESS',
                          message: 'Sending all saved Hikes!',
                          data: results,
                      })
                    : res.status(500).json({
                          status: 'ERROR',
                          message: 'No saved hikes!',
                      });
            }
        })
        .catch((error) => res.status(500).json({ error: error }));
};

const postHike = (req, res) => {
    const newSaveHike = new saveHikeModel(req.body);

    newSaveHike
        .save()
        .then((result) => {
            console.log('Hike Saved to DB WITH FOLLOWING DETAILS:', result);

            res.status(201).json({
                status: 'SUCCESS',
                message: 'Hike Successfully Saved!',
                data: result,
            });
        })
        .catch((error) =>
            res.status(500).json({
                status: 'ERROR',
                message: 'Hike not Saved!',
            })
        );
};

module.exports = { getAllHikes, postHike };
