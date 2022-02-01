const User = require("../models/User");

const bcrypt = require("bcryptjs");
const RegisterUser = (req, res) => {
    const { name, email, location, password, confirm } = req.body;
    if (!name || !email || !password || !confirm) {
      console.log("Fill empty fields");
      res.send({"message":"Fill empty fields"})
    //   return;
    }
    //Confirm Passwords
    if (password !== confirm) {
      console.log("Password must match");
      res.send({"message":"password do not match"})
    } else {
      //Validation
      User.findOne({ email: email }).then((user) => {
        if (user) {
          console.log("email existsss");
          res.send({"message":"this email already exists",
                    "status":"303"});
        //   res.render("register", {
        //     name,
        //     email,
        //     password,
        //     confirm,
        //   });
        } else {
          //Validation
          const newUser = new User({
            name,
            email,
            location,
            password,
          });
          console.log(newUser);return;
          //Password Hashing
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(res.redirect("/login"))
                .catch((err) => console.log(err));
            })
          );
        }
      });
    }
  };
  module.exports = {RegisterUser};