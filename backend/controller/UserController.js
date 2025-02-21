import User from '../model/UserModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: '1h'})
}

//Route for user Login
const loginUser = async (req,res) => {
    try
    {
        const {email, password} = req.body
        
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({success: false, msg: "User not found !"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if(isMatch){
            const token = createToken(user._id)
            res.json({success: true, token})
        }else{
            return res.status(400).json({success: false, msg: "Incorrect Password !"})
        }

    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({success: false, msg: "Server Error !"})
    }
}

//Route for user Registration
const registerUser = async (req,res) => {
    try
    {
        const {name,email,password} = req.body
        const exists = await User.findOne({email}) //Check if user already exists
        if(exists){
            return res.status(400).json({success: false ,msg: "Email already exists !"})
        }
        
        //Validating email and password
        if(!validator.isEmail(email)){
            return res.status(400).json({success: false, msg: "Invalid Email !"})
        }
        if(password.length < 8){
            return res.status(400).json({success: false, msg: "Password should be at least 8 characters long !"})
        }

        //Hashing the password 
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        //Creating a new user
        const newUser = new User({name,email,password: hashedPassword})
        await newUser.save()

        //Send back the user object and JWT token
        const token = createToken(newUser._id)
        res.json({success: true, token})
    }
    catch(err)
    {
        console.error(err)
        res.status(500).json({success: false, msg: "Server Error !"})
    }
}

//Route for Admin Login
const adminLogin = async (req,res) => {
    try
    {
        const {email, password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password , process.env.JWT_SECRET)
            res.json({success: true, token})
        }
        else{
            return res.status(400).json({success: false, msg: "Invalid Admin Credentials !"})
        }
    }
    catch(error)
    {
        console.error(error)
        res.status(500).json({success: false, msg: "Server Error!"})
    }
}

export { loginUser, registerUser, adminLogin }