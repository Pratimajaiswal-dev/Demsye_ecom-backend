const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const {findUserByEmail,createUser,getUserById}=require("../models/userModel");


//Register user
exports.registerUser=async(req,res)=>{

try{
    const {fullName,email,password,phone}=req.body;


    //check if user added full details or not
    if (!fullName || !email || !password || !phone) {
        return res.status(400).json({
            success:false,
            message:"Please provide all required fields"
        });
    }

    //Check existing email
    const existingUser=await findUserByEmail(email);
    if(existingUser){
        return res.status(400).json({
            success:false,
            message:"User already exists with this email"
        });
    }

    //Hash the password
    const passwordHash=await bcrypt.hash(password,10);

    //save user to database
    await createUser({fullName,email,passwordHash,phone});

    res.status(201).json({
        success:true,
        message:"User registered successfully!!",
    });
    
}catch(err){
    console.log(err);
    res.status(500).json({
        success:false,
        message:"Internal Server Error"
    });
};

};

//Login user.
exports.loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body;

        //Valaidation
        if(!email ||!password){
            return res.status(400).json({
                success:false,
                message:"Please provide both email and password"    
            });
        }

        //Find user by email
        const user=await findUserByEmail(email);
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User not found with this email"
            });
        }

        //Compare password
        const isMatch=await bcrypt.compare(password,user.PasswordHash); 
        if(!isMatch){
            return res.status(400).json({
                success:false,
                message:"Invalid password"
            });
        }

        //Generate JWT token
        const token=jwt.sign(
            {
                userId:user.UserId,
                email:user.Email,
                role:user.Role
            },
            process.env.JWT_SECRET,
            {
                 expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        res.status(200).json({
            success:true,
            message:"Login successfull!!",
            token,
            user:{
                userId:user.UserId,
                fullName:user.FullName,
                email:user.Email,
                phone:user.Phone,
                role:user.Role
            }
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
};

//Get user profile
exports.getProfile=async(req,res)=>{
    try
    {
        const user=await getUserById(req.user.userId);

        res.status(200).json({
            success:true,
            message:"User profile fetched successfully!!",
            user
        });
    }
    catch(err){
        console.log(err);
        res.status(500).json({
            success:false,
            message:"Internal Server Error"
        });
    }
};