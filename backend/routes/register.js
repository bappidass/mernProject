const express = require('express');
const Router = express.Router();
const User = require('../modules/register');
require('dotenv').config();
const nodemailer = require('nodemailer');
var otps = {};
//register routes
Router.post('/register', async (req, res) => {
  try {
    const {email,otpbtnstatus} =req.body;
    if(otpbtnstatus=='verified'){
      const userExist= await User.findOne({email})
      console.log(userExist)
      if(userExist){
        res.send('User already exist');
       
      }else{
        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).send('Account has been succesfully created');
      }
    
    }else{
      res.send('otp verification failed');
    }
   
  } catch (error) {
    res.status(500).send(error);
  }
});


//send otp for verification
Router.post('/sendotp',async (req, res) => {
  const {email,name}=req.body;
  const userExist= await User.findOne({email})
  console.log(userExist)
  if(userExist){
    res.send('already');
  }else{
  function generateOTP(length = 6) {
    const chars = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += chars[Math.floor(Math.random() * chars.length)];
    }
    return otp;
  }

  const oneTimeOtp=generateOTP();

  otps={oneTimeOtp,email};

  if(email==''){
    res.send('Enter email')
  }else{
    let mailOptions = {
      from: 'connexteam947@gmail.com', 
      to: email, 
      subject: 'OTP', 
      text: '8367236724',
      html: `<div style="max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; background-color: #f9f9f9; font-family: Arial, sans-serif; line-height: 1.6;">
    <p style="margin-bottom: 15px;">Hello ${name}</p>
    <p style="margin-bottom: 15px;">
        Your OTP for your register  is <span style="font-size: 1.2em; font-weight: bold;">${oneTimeOtp}</span>. Please enter this code within the next 5 minutes to access your account. Remember, do not share this code with anyone.
    </p>
    <p style="margin-top: 20px;">Thank you,<br>
    Connex Team</p>
</div>
`, 
    };
  
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).send(error.toString());
      }
      res.status(200).send('success');
    });
  }

 }
});

//verify otp

Router.post('/verifyOtp',(req,res)=>{
const {email,otp}=req.body;
if(otp==otps.oneTimeOtp && email==otps.email){
  res.send('success')
  
}else{
  res.send('notvailed')

}
})


//email send to register user 

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'connexteam947@gmail.com',
    pass: process.env.EMAIL_PASSKAY, 
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

