const express = require("express")
const passport = require("passport")
const cors = require("cors")
require('dotenv').config();
require('./config/passport_googlesgrategy');
const mongoose = require("mongoose") 
const userRoutes = require("./routes/userRoutes")
const socialAuthRoutes = require("./routes/socialAuthRoutes")
const app = express();

const PORT = process.env.PORT || 5000;

//connect mongodb cloud
const uri = process.env.MONGODB_URL
mongoose.connect(uri,{   
    useNewUrlParser: true,
    useUnifiedTopology:true
})
const connection = mongoose.connection
connection.once('open',()=>{
    console.log("mongodb connected sucessfully");
})
connection.on('error',(err)=>{
    console.log(err);
})

app.use(express.json())

//cors middleware
app.use(cors());

//passportjs middleware
app.use(passport.initialize())
app.use(passport.session())

require("./config/passport")(passport);

//user routes 
app.use("/user",userRoutes)
//social media login auth routes
app.use("/auth",socialAuthRoutes)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})