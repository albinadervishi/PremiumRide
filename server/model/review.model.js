const mongoose = require('mongoose');
const {User, Driver} = require('../model/user.model');

const ReviewSchema = new mongoose.Schema({
    rating:{ 
        type: Number, 
        min: 1, 
        max: 5 
    },
    comment:{
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
},
 { timestamps: true });
 
module.exports = mongoose.model('Review', ReviewSchema);