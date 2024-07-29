import mongoose from "mongoose";
import path from "path";

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
        return this._password;//recup mdp en clair
    });
User.methods={//methodes
    authenticate: function(plainText) {
    return this.encryptPassword(plainText)===this.hashed_password
    },//Chiffre le mot de passe fourni (plainText) en utilisant la méthode encryptPassword et compare le résultat avec le mot de passe chiffré stocké (hashed_password). Retourne true si les deux correspondent, sinon false
    encryptPassword:function (password){
        if (!password) return '';
        try{
            return crypto.createHmac('sha1', this.salt).update(password).digest('hex') //Crée un objet HMAC avec l'algorithme sha1 et le sel pour update le mdp
        }
        catch(err){
            return '';
        }
    },
    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + ''
        }
        
}
//Password field validation
User.path('hashed_password').validate(function(v) { //validation le hash save in db with the password virtual
if (this._password && this._password.length < 6) {
this.invalidate('password', 'Password must be at least 6 characters.')
}
if ( !this._password) {
this.invalidate('password', 'Password is required')
}
}, null)// `null` ici pour indiquer qu'il n'y a pas de fonction de validation spécifique en dehors de la validation personnalisée

export const user = mongoose.model('user',User)