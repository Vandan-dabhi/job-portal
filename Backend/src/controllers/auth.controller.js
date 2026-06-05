import userModel from "../models/user.model.js"
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const registerUser = async (req,res) => {
   try{
      const {username,email,password} = req.body

      const isuseralredyexists = await userModel.findOne({
        $or:[
          {username},
          {email}
        ]
      })

      if(isuseralredyexists){
      return  res.status(409).json({message:"user already exists"});
      }

      const hash = await bcrypt.hash(password,10);

      const user = await userModel.create({
        username,
        email,
        password:hash
      })

      const token = jwt.sign({
        id:user._id
      },process.env.JWT_SECRET)

     res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

      res.status(201).json({
        message:"user created successfully",
        user:{
          id:user._id,
          username:user.username,
          email:user.email
        }
      })

   }catch(err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

export const loginUser = async (req,res) => {
       try{
       const {usernameoremail,password} = req.body

       const user = await userModel.findOne({
        $or:[
          {username:usernameoremail},
          {email:usernameoremail}
        ]
      })
      
      if(!user){
      return res.status(401).json({message:"invalid credentials"});
      }

      const isPasswordMatch = await bcrypt.compare(password,user.password);

      if(!isPasswordMatch){
        return res.status(401).json({message:"invalid credentials"});
      }

      const token = jwt.sign({
        id:user._id
      },process.env.JWT_SECRET)

     res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
      
      res.status(200).json({
        message:"logged in successfully",
        user:{
          id:user._id,
          username:user.username,
          email:user.email
        }
      })
    }
   catch(err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

export const logoutUser = async (req,res) => {
    try{
     res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none"
    });

      res.status(200).json({
         message:"logout successfully"
      })
    }catch(err){
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}