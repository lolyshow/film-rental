const express= require('express');
const mongoose= require('mongoose');
let bcrypt = require('bcryptjs');
const User= require('../models/User');
const { Validator } = require('node-input-validator');
const jwt = require("jsonwebtoken");
const { AuthSuccessResponse, AuthFailureResponse } = require('./helper');
const config = process.env.secret;

const Register =async(req,res)=>{

    const v = new Validator(req.body, {
        name:'required',
        email: 'required|email',
        password: 'required',
        location:'required'
      });
    
      v.check().then((matched) => {
        if (!matched) {
          res.status(422).send(v.errors);
        }
      });
    
   
    // console.log("hiiiiiii",hashedPassword)
    const {email,password,location,name} = req.body;
    const oldUser = await User.findOne({email});
    if(!oldUser){
      let hashedPassword = bcrypt.hashSync(password, 8);
      const newUser = new User({
          name:name,
          email:email,
          password:hashedPassword,
          location:location,
      });

      try{
        const token = jwt.sign(
          { user_id: newUser._id, email },
          process.env.secret,
          {
            expiresIn: "2h",
          }
        );
        await newUser.save();
          res.status(200).json(AuthSuccessResponse(newUser,token));
        }
        catch(error) {
        res.status(400).json({ message : error.message});
      }
    }else{
      res.status(202).json({ message : "This email "+email+ " already exists"});
    }
}


const Login = async(req, res)=>{
  const v = new Validator(req.body, {
    email: 'required|email',
    password: 'required',
    
  });

  v.check().then((matched) => {
    if (!matched) {
      console.log("insideHererere");
      return res.status(422).send(v.errors);
    }else{
      console.log("checked")
    }
  });
  // Our login logic starts here
  // try {
  //   // Get user input
  //   const { email, password } = req.body;

  //   // Validate user input
  //   if (!(email && password)) {
  //     res.status(400).send("All input is required");
  //   }
  //   // Validate if user exist in our database
  //   const user = await User.findOne({ email });

  //   if (user && (await bcrypt.compare(password, user.password))) {
  //     // Create token
  //     const token = jwt.sign(
  //       { user_id: user._id, email },
  //       process.env.secret,
  //       {
  //         expiresIn: "2h",
  //       }
  //     );
  //     // save user token
  //     user.token = token;
      
  //     // user
  //     res.status(200).json(AuthSuccessResponse(user,token));
  //   }else{
  //     res.status(300).json(AuthFailureResponse());
  //   }
    
  // } catch (err) {
  //   console.log(err);
  // }
  // Our register logic ends here
}
module.exports={
    Register,
    Login
}
