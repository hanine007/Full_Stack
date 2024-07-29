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
 salt:String,
 })
 User.virtual('password')
    .set(function(password) {
        this._password = password; //Le mot de passe en clair est stocké dans la propriété privée _password
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);//e mot de passe est chiffré en utilisant la méthode encryptPassword(password)
    })
    .get(function() {
        return this._password;
    });

 

export const user = mongoose.model('user',User)