const {User, Driver} = require('../model/user.model')

module.exports = {
    getDrivers: (req, res) => { //marrim drivers
        User.find({status: "Driver"})
        // .populate('driverDetails')
            .then(driver => res.json(driver))
            .catch(err => res.json(err))
    },

    getDriver : (request, response) => {
        User.findOne({ _id: request.params.id, status: "Driver" })
          .then((user) => {
            if (!user) {
              return response.status(400).json({ error: "User not found" });
            } else {
              response.json(user);
            }
          })
          .catch((err) => response.json(err));
      },

      updateDriver : (request, response) => {
        User.findOneAndUpdate({ _id: request.params.id }, request.body, {
             new: true,
           })
         .then((updatedUser) => response.json(updatedUser))
         .catch((err) => response.status(500).json(err));
     },

    removeDriver: (req, res) => {   
        User.findOneAndUpdate({_id: req.params.id}, {driverDetails: null,status:"User"}, {new: true, runValidators: true})
        .then(updateRole => res.json(updateRole))
        .catch(err => res.json(err))
    },
   
}