import { compare, hash } from 'bcrypt';
import userModel from '../models/user.js'
import { seperateName } from './basicOperations.js';
import { createUserToken } from './JWT.js';

export const userLogin = async(req, res)=>{
  const user = req.body
  try{
    const isUser = await userModel.findOne({email: user.email})
    if(isUser){
      const valid = await compare(user.password,isUser.password);
      if(valid){
        const token = createUserToken({firstName: isUser.firstName, lastName: isUser.lastName, email: isUser.email})
        res.cookie('user_token', token)
        res.json({firstName: isUser.firstName, lastName: isUser.lastName, email: isUser.email})
      }
      else{
        res.status(400).json("Invalid Credentials")
      }
    }
    else{
      res.status(400).json("Invalid Credentials")
    }
  }
  catch(err){
    res.status(500).json(err)
  }
}

export const userSignup = async(req, res)=>{
  const password = await hash(req.body.password, 10);
  const firstName = req.body.firstName
  const lastName = req.body.lastName
  const email = req.body.email
  const phoneNo = req.body.phoneNo

  try{
    const user = await userModel.findOne({email: email})
    if(user){
      res.status(400).json("user Already registered")
    }
    else{
      const newUser = new userModel({firstName, lastName, email, phoneNo, password});
      const savedUser = await newUser.save();
      res.json(savedUser)
    }
  }
  catch(err){
    res.status(500).json("An Error Occured")
  }
}

export const googleAuth = async(req, res)=>{
  const user = req.body
  const name = seperateName(user.user.displayName)
  const email = user.user.email
  try{
    const password = await hash('googleAuth', 10)
    const isUser = await userModel.findOne({email})
    if(isUser){
      const valid = await compare('googleAuth', isUser.password)
      if(valid){
        const token = createUserToken({firstName: name[0], lastName: name[1], email: email})
        res.cookie('user_token', token)
        res.json({firstName: name[0], lastName: name[1], email: email})
      }
      else{
        res.status(400).json("Try to Login in Manually")
      }
    }
    else{
      const newUser = new userModel({user, firstName: name[0], lastName: name[1], email, password})
      const savedUser = await newUser.save();

      res.json(savedUser)
    }
  }
  catch(err){
    console.log(err);
    res.status(500).json("Something went Wrong")
  }
}

export const checkUser = (req, res)=>{
  res.json(req.body.token)
}

export const logoutUser = (req, res)=>{
  res.json("logout")
}