const User = require('../model/userModel');
const Users = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const createUser = async (req, res) => {
    console.log(req.body);

    // Destructuring the JSON data
    const { firstName, lastName, email, password } = req.body;

    // Validate the data
    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }

    try {
        // Check existing user
        const existingUser = await Users.findOne({ email: email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists."
            });
        }

        // Password encryption
        const generateSalt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, generateSalt);

        // Create new user
        const newUser = new Users({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: encryptedPassword
        });

        // Save the user
        await newUser.save();

        // Send the response
        res.status(200).json({ msg: "User created successfully." });

    } catch (error) {
        res.status(500).json({ msg: "Server Error." });
    }
}

const loginUser = async (req, res) => {
    // Step 1 : Check if data is coming or not
    console.log(req.body);

    // step 2 : Destructure the data
    const {email, password} = req.body;

    // step 3 : validate the incomming data
    if(!email || !password){
        return res.json({
            success : false,
            message : "Please fill all the fields."
        })
    }

    // step 4 : try catch block
    try {
        // step 5 : Find user
        const user = await Users.findOne({email : email}) // user store all the data of user
        if(!user){
            return res.json({
                success : false,
                message : "User does not exists."
            })
        }
        // Step 6 : Check password
        const passwordToCompare = user.password;
        const isMatch = await bcrypt.compare(password, passwordToCompare)
        if(!isMatch){
            return res.json({
                success : false,
                message : "Password does not match."
            })
        }

        // Step 7 : Create token
        const token = jwt.sign(
            {id : user._id},
            process.env.JWT_TOKEN_SECRET,
        )

        // Step 8 : Send Response
        res.status(200).json({
            success : true,
            token : token,
            userData : user,
            message : "User logged in successfully."
        })
        
    } catch (error) {
        console.log(error);
        res.json(error)
    }
}


// Exporting
module.exports = {
    createUser,
    loginUser
};
