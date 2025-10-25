const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({

        username: {type:String},
        email: {type:String,unique:true},
        password: {type:String},
        role:{type:String, enum:["admin" , "user"], required:true , default:"user"},
        profileId:{type:Number}

})

const userModel = mongoose.model("User" , userSchema)

module.exports = userModel;