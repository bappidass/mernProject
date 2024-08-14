const { default: mongoose } = require('mongoose');
const mongooesh=require('mongoose');
const {Schema}= mongooesh;

const userSchema=new Schema({
  name:{
    type:String
  },
  email:{
    type:String
  },
  univercity:{
    type:String
  },
  password:{
    type:String
  },
  otpbtnstatus:{
    type:String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const user=mongoose.model('user',userSchema);

module.exports = user;