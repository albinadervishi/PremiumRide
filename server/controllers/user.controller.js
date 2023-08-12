const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports = {
  register : (req, res) => {
  const { email } = req.body;
    User.findOne({ email })
      .then(emailExists => {
        if (emailExists) {
          return Promise.reject({ errors: { email: { message: 'An user with this email already exists' } } });
        } else {
          return  User.create(req.body);
        }
      })
      .then((user) => {
        const userToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.SECRET_KEY
        );
  
        res
          .cookie("usertoken", userToken, {
            httpOnly: true,
          })
          .json({ msg: "success!", user: user });
      })
      .catch((err) => res.json(err));

},

login : async (req, res) => {
  console.log(req.body.password);
  const user = await User.findOne({ email: req.body.email });

  if (user === null) {
    return res.status(400).json({
      errors: { email: { message: "There is no user with this email" } },
    });
  }
  console.log(user.password);

  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  console.log(correctPassword);
  if (!correctPassword) {
    return res
      .status(400)
      .json({ errors: { password: { message: "The password is incorrect" } } });
  }

  console.log("Err");
  const userToken = jwt.sign(
    {
      id: user._id,
    },
    process.env.SECRET_KEY
  );

  res
    .cookie("usertoken", userToken, {
      httpOnly: true,
    })
    .json({ msg: "success!" , user:user});
},

logout : (req, res) => {
  res.clearCookie("usertoken");
  res.sendStatus(200);
},

findAllUsers : (req, res) => {
  User.find()
    .then((allUsers) => {
      res.json({ user: allUsers });
    })
    .catch((err) => {
      res.json({ message: "Something went wrong", error: err });
    });
},

getUser : (request, response) => {
  User.findOne({ _id: request.params.id })
    .then((user) => {
      if (!user) {
        return response.status(400).json({ error: "User not found" });
      } else {
        response.json(user);
      }
    })
    .catch((err) => response.json(err));
},

updateUser : (request, response) => {
   User.findOneAndUpdate({ _id: request.params.id }, request.body, {
        new: true,
      })
    .then((updatedUser) => response.json(updatedUser))
    .catch((err) => response.status(500).json(err));
},

deleteUser : (request, response) => {
  User.deleteOne({ _id: request.params.id })
    .then((deleteConfirmation) => response.json(deleteConfirmation))
    .catch((err) => response.json(err));
}

}
