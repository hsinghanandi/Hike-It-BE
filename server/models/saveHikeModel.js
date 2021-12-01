// This will be the model used upon creation of a new user
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const saveHikeSchema = new Schema({
    name: { type: String, maxLength: 1000, default: '' },
    placeID: { type: String, maxLength: 1000, default: '' },
    photoRef: { type: Array, maxLength: 1000, default: '' },
    address: { type: String, maxLength: 1000, default: '' },
    status: { type: String, maxLength: 1000, default: '' },
    weekdayText: { type: Array, maxLength: 1000, default: '' },
    rating: { type: String, maxLength: 1000, default: '' },
    latitude: { type: String, maxLength: 1000, default: '' },
    longitude: { type: String, maxLength: 1000, default: '' },
    types: { type: Array, maxLength: 1000, default: '' },
    phoneNumber: { type: String, maxLength: 1000, default: '' },
    vicinity: { type: String, maxLength: 1000, default: '' },
    website: { type: String, maxLength: 1000, default: '' },
    reviews: { type: Array, maxLength: 1000, default: '' },
});

const saveHikeModel = mongoose.model('savedHike', saveHikeSchema);

module.exports = saveHikeModel;
