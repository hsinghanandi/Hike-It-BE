// This will be the model used upon creation of a new user
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
    // validtaion will be done here w.r.t the input properties & defined allowed parameters
    {
        username: { type: String, maxLength: 30 },
        email: { type: String, required: true, maxLength: 100, unique: true },
        password: { type: String, required: true, maxLength: 100 },
    },
    { versionKey: false }
);

userSchema.statics.isEmailInUse = async function (email) {
    if (!email) {
        throw new Error('Invalid Email. No user exists!');
    }
    try {
        const user = await this.findOne({ email });
        return user ? false : true;
    } catch (error) {
        console.log('Error inside isEmailInUse Method!', error.message);
        return false;
    }
};

const userModel = mongoose.model('User', userSchema);

module.exports = userModel;
