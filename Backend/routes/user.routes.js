const express = require("express");
const userRoutes = express.Router();
const userModel = require("../model/user.model");
var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv').config()
const passport = require("passport");
const GitHubStrategy = require("passport-github2").Strategy;




// Signup
userRoutes.post("/signup", async (req, res) => {
  try {
    const { username, email, password,role } = req.body;

    // Hash password
    const hash = await bcrypt.hash(password, saltRounds);
    await userModel.create({ username,  email, password: hash , role});
    res.status(200).json({ msg: "Signup success" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Something went wrong in signup" });
  }
});







//// Login
userRoutes.post("/login", async (req, res) => {
  try {
      const { email, password } = req.body;

       const user = await userModel.findOne({ email });
        if (!user) {
          return res.status(404).json({ msg: "User not found" });
        }
         const isMatch = await bcrypt.compare(password, user.password);
         var token = jwt.sign({ userId: user._id ,role : user.role }, 'shhhhh',{ expiresIn: 20  } );


        if (!isMatch) {
          return res.status(401).json({ msg: "Invalid credentials" });
        }

    res.status(200).json({ msg: "Login success", user , token});
  } catch (err) {

    res.status(500).json({ msg: "Something went wrong in login" });
  }
});





//github OAuth
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
      return done(profile);
  }
));



//call the github login/authorization page

userRoutes.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));


//call back routes in case of login success or failure
userRoutes.get('/auth/github/callback',
  passport.authenticate('github', { session : false ,failureRedirect: '/login' }),
  async function  (req, res) {
    // Successful authentication, redirect home.
    //res.redirect('/');
    const gitHubUserId = req.user.id;
    const user = await userModel.find({profileId : gitHubUserId })
    console.log(user)
    if(user.length == 0){
       let newUser = await userModel.create({profileId : gitHubUserId})
       var token = jwt.sign({ userId: newUser._id ,role : newUser .role }, 'shhhhh');
       res.json({ msg: "github Login success" , token});
    }else{
       var token = jwt.sign({ userId: user._id ,role : user.role }, 'shhhhh');
    }


  });




module.exports = { userRoutes };
