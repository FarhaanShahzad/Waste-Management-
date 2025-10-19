const express = require("express");
const {connectDB} = require("./config/db")
const {userRoutes} = require("./routes/user.routes");
const app = express();
app.use(express.json());
require('dotenv').config()


const PORT = process.env.PORT;
connectDB();


app.use("/userRoutes" , userRoutes);


app.get("/getAll" , (req,res) => {
   res.status(200).json({msg : "get signup data"});
})



app.use((req,res) => {
   res.status(404).json({msg : "404 not found"});
})



app.get('/login' , (req,res) => {
    res.status(200).json({msg : "please login again github"});
})



app.listen(8080 , () => {
 console.log("server is running on localhost 8080");
})