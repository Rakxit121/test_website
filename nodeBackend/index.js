// console.log("Welcome to NODE!")

//  importing 
const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const connectDB = require('./database/db');
const cors = require('cors');
const multiparty = require('connect-multiparty');
const cloudinary = require('cloudinary');




//  Making express app
const app = express();


//  Configuring dotenv
dotenv.config();
// dotenv.config({path: './config/config.env'});

// cors policy
const corsOptions = {
    origin: true,
    credentials: true,
    optionsSuccessStatus: 200
} 

app.use(cors(corsOptions));

// multiparty middleware
app.use(multiparty());

// clodinary configurartion
          
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET 
});



// mongodb connection from db.js
connectDB();


//  middleware
// json data middleware (body-parser)
app.use(express.json());




//  SIMPLE TEST ROUTE
app.get('/test',(req,res) => {
    res.send("Hello from express server")
})






//  HELLO Route 
// PATH: /hello
app.get('/hello',(req,res) => {
    res.send("Welcome to HELLO API start..")
})

// user router
app.use('/api/user', require('./routes/userRoutes'))


// our actual routes
// http://localhost:5000/api/user/create
// http://localhost:5000/api/user/login


// CREATE A ROUTE FOR PRODUCTS 
app.use('/api/product', require('./routes/productRoutes')) 



// defining (setting up) PORT
const PORT = process.env.PORT;


// run the server
app.listen(PORT, () =>{
    console.log(`Server is running on port ${PORT}`);
})

