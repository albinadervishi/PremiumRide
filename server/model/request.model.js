const mongoose = require('mongoose');
const {User} = require('../model/user.model');

const RequestSchema = new mongoose.Schema({
    request_status:{
        type: String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    driving_license: {
        type: String
      },
    car_info: {
        type: String
    },
},
 { timestamps: true });
 
module.exports = mongoose.model('Request', RequestSchema);