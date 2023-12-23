const router = require('express').Router();
const userController = require('../controllers/userControllers');




router.post('/create', userController.createUser) 

// task 1: create login API code
// router.post("/login",(req,res)=>{
//     res.send("Welcome to LOGIN API.")
// })

router.post('/login', userController.loginUser)

// export
module.exports = router;