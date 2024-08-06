const express = require('express');
const Router = express.Router();
const User = require('../modules/register');


//register routes
Router.post('/register', async (req, res) => {
  try {
    const {email} =req.body;
    const userExist= await User.findOne({email})
    console.log(userExist)
    if(userExist){
      res.send('User already exist');
     
    }else{
      const newUser = new User(req.body);
      await newUser.save();
      res.status(201).send('Account has been succesfully created');
    }
  
  } catch (error) {
    res.status(500).send(error);
  }
});


//login routes
Router.post('/login',async(req,res)=>{
  try {
    const {email,password}=req.body;
    const userExist = await User.findOne({email})
    console.log(userExist)
    if(userExist){
      if(userExist.password==password){
        res.send('success')
      }else{
        res.send('wrong')
      }
    }else{
      res.send('notExist')
    }
    
  } catch (error) {
    
  }
})

//profile details get routes

Router.post('/profile',async(req,res)=>{
  const {email}=req.body;
  console.log(email);
  const userExist = await User.findOne({email})
  res.send(userExist)
})


//delete existing user

Router.post('/DeletProfile',async(req,res)=>{
  const {email}=req.body;
  console.log(email);
  const userExist = await User.deleteOne({email})
  res.send('success')
})













module.exports = Router;

