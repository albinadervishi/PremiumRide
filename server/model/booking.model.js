const mongoose = require('mongoose');
const User = require('../model/user.model');
const Driver = require('../model/user.model');

const BookingSchema = new mongoose.Schema({
    pickup_location:{
        type: String,
    },
    pickup_time:{
        type: Number,
    },
    dropoff_location:{
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
    booking_status: {
        type: String,
        default: "pending"
    }
},
 { timestamps: true });
 
module.exports = mongoose.model('Booking', BookingSchema);