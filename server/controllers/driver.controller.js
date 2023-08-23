const { User, Driver } = require("../model/user.model");
const mongoose = require("mongoose");

module.exports = {
  getDrivers: (req, res) => {
    //marrim drivers
    User.find({ status: "Driver" })
      .populate("company")
      .then((driver) => res.json(driver))
      .catch((err) => res.json(err));
  },

  getDriver: (request, response) => {
    User.findOne({ _id: request.params.id, status: "Driver" })
      .populate("company")
      .then((user) => {
        if (!user) {
          return response.status(400).json({ error: "User not found" });
        } else {
          response.json(user);
        }
      })
      .catch((err) => response.json(err));
  },

  getCompanyDrivers: (req, res) => {
    const companyId = new mongoose.Types.ObjectId(req.params.adminId);
    User.find({ company: companyId })
      .then((requests) => {
        console.log("Found drivers:", requests);
        res.json(requests);
      })
      .catch((err) => {
        console.error("Error in User.find:", err);
        res.status(500).json({ error: "An error occurred" });
      });
  },

  updateDriver: (request, response) => {
    User.findOneAndUpdate({ _id: request.params.id }, request.body, {
      new: true,
    })
      .then((updatedUser) => response.json(updatedUser))
      .catch((err) => response.status(500).json(err));
  },

  removeDriver: (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { driverDetails: null, status: "User" },
      { new: true, runValidators: true }
    )
      .then((updateRole) => res.json(updateRole))
      .catch((err) => res.json(err));
  },
};
