// importing any necessary 
const mongoose = require('mongoose');

// function (Any)
const connectDB = () => {
    mongoose.connect(process.env.DB_URL).then(() => {
        console.log("Connected to DataBase");
    })
}

// exporting the function
module.exports = connectDB;