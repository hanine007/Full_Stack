import mongoose from "mongoose";
 const User = new mongoose.Schema({
 name:{
    type:String,
    required:'name is required',
    trim:true
 },
 email:{
    type:String,
    trim:true,
    required:'email is required',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    unique:'Email already exist'
 },
 created:{
    type:Date,
    default:Date.now
 },
 update:true,
 hashed_password:{
    type:String,
    required:'password is required',
    
 },
 salt:String
 
})
export const user = mongoose.model('user',User)