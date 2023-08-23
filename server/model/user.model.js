const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlength: [3, "Emri duhet te jete me i gjate se 3 "],
      required: [true, "This field is required"],
    },
    lastName: {
      type: String,
      required: [true, "This field is required"],
    },
    password: {
      type: String,
      required: [true, "This field is required"],
    },
    email: {
      type: String,
      required: [true, "This field is required"],
      validate: {
        validator: (val) => /^([\w-\.]+@([\w-]+\.)+[\w-]+)?$/.test(val),
        message: "Please enter a valid email",
      },
    },
    img: { type: String },
    phoneNumber: {
      type: Number,
      required: [true, "This field is required"],
    },
    status: {
      type: String,
      default: "User"
  },
  },
  { timestamps: true }
);

const DriverSchema = new mongoose.Schema({
    driving_license: {
        type: String,
        required: [true, "This field is required"],
      },
    car_info: {
        type: String,
        required: [true, "This field is required"],
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, "This field is required"],
  },
    availability: {
        type: Boolean,
        default: 'true'
    },
    // Include fields from the user schema
    ...UserSchema.obj,
  });

UserSchema.virtual("confirmPassword")
  .get(() => this._confirmPassword)
  .set((value) => (this._confirmPassword = value));

UserSchema.pre("validate", function (next) {
  if (this.password !== this.confirmPassword) {
    this.invalidate("confirmPassword", "Password must match confirm password");
  }
  next();
});

UserSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;
    console.log(this.password)
    next();
  });
});

const User = mongoose.model('User', UserSchema);
const Driver = User.discriminator('Driver', DriverSchema);

module.exports = { User, Driver};
