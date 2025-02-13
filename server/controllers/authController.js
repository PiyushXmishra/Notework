const noteUser = require("./../models/userModel")
const jwt = require("jsonwebtoken")
require("dotenv").config();
const {joinedDate}= require('../utils/joinDate')

const profileImageUrl=[
  'https://res.cloudinary.com/dmuigsle3/image/upload/v1732558377/e9xqwr7g9mzusjtzcv14.webp',
  'https://res.cloudinary.com/dmuigsle3/image/upload/v1732558358/babf2uk4rot0cu1jje2j.jpg',
  'https://res.cloudinary.com/dmuigsle3/image/upload/v1732558358/vgxnmm0f7f4nj5olktjj.jpg',
  'https://res.cloudinary.com/dmuigsle3/image/upload/v1732558358/gmgk4kv1h7pgfxbbpqck.jpg',
  'https://res.cloudinary.com/dmuigsle3/image/upload/v1732558358/da2bsm7z6jioc9wivatp.jpg',
  
]



const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES,
    });
  };
  const cookie = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES*60*60*24*1000
    ),
    httpOnly: true,
    secure: true,
  sameSite: 'strict',
  domain:'http://localhost:5173',
  path:'/'

  }
 
  exports.signup = async (req, res, next) => {
    try {
      const email = req.body.email
      console.log(req.body.confirmPassword)
      const existingUser = await noteUser.findOne({ email });
      if (existingUser) return res.status(400).json({ message: 'User already exists' });
      const profilePicture = profileImageUrl[Math.floor(Math.random() * profileImageUrl.length)];
      const newUser = await noteUser.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        profilePicture,
        joinedDate
      });
      const token = signToken(newUser._id);
      res.cookie('JWT',token,cookie)
      console.log(token);
      res.status(201).json({
        status: "ok",
        token,
      });
    } catch ({ name, message }) {
      res.status(404).json({
        status: name,
        message,
      });
     console.log(message)
    }
  };


  exports.login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  console.log(email + '\n' + password)
      if (!email || !password) {
        return "Something went wrong";
      }
  
      const user = await noteUser.findOne({ email }).select("+password");
  
      const correct = await user.correctPassword(password, user.password);
      if (!correct) {
        return next(new Error("Incorrect Password"));
      }
    
      const token = signToken(user._id);
      res.cookie('JWT',token,cookie)
      console.log(cookie)
     user.password=undefined
     console.log(token)
      res.status(200).json({
        status: "success",
         user: user.name,
       token,
      });
    } catch ({ name, message }) {
      res.status(401).json({
        status: name,
        message,
      });
      console.log(message);
    }
  };
  

exports.auth= async(req,res,next)=>{
  try {
  const JWT = req.cookies.JWT


  if (!JWT) {
    return res.status(401).json({ message: 'No jwt provided' });
  }
  const decoded =await  jwt.verify(JWT, process.env.JWT_SECRET);
    console.log('Decoded: ',decoded.id)
    const user = await noteUser.findById(decoded.id)
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }   
    res.status(200).json({
        status:"success",
        data:{
          id: decoded.id,
          name:user.name,
          email:user.email,
          profile:user.profilePicture,
          joinedDate: user.joinedDate
        }
      }); 
      next()
  } catch (err) {
  console.log(err)
    return res.status(401).json({ message: err });
  }
}



exports.logout= async(req,res)=>{
 
  if (!req.cookies.JWT) {
  
    return res.status(401).json({ message: 'No jwt provided' });
  }

  res.cookie('JWT','', {
    httpOnly: true,
    secure: true, 
    sameSite: 'strict',
    expires:new Date(0) 
  });
  res.status(200).send('Logged out');
}


exports.deleteAcc = async(req,res)=>{
  try{
  const {JWT}= req.cookies
  if (!JWT) {
  
    return res.status(401).json({ message: 'No jwt provided' });
  }
  const decoded =await  jwt.verify(JWT, process.env.JWT_SECRET);
  const delAcc = await noteUser.findByIdAndDelete(decoded.id)
  if(!delAcc)return new Error(`Error while deleting account ${res.status}`) 
 
  res.status(204)
  }catch (err) {
    console.log(err)
      return res.status(401).json({ message: err });
    }
}


