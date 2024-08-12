const express = require('express');
const Router = express.Router();
const User = require('../modules/register');
require('dotenv').config();
const nodemailer = require('nodemailer');

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

//email send to register user 

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'connexteam947@gmail.com',
    pass: 'abcs lizb cvbw vofw', 
  },
});

Router.post('/sendmail', (req, res) => {
  const {email,sendDATA}=req.body;

  let mailOptions = {
    from: 'connexteam947@gmail.com', 
    to: email, 
    subject: 'Thank you for registering with us', 
    text: '8367236724',
    html: `${sendDATA}`, 
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    res.status(200).send('Email sent: ' + info.response);
  });
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

