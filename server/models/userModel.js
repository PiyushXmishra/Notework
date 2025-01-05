const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt")
const user = new mongoose.Schema({
     name:{
        type:String,
      
        required:true,

     },
     email:{
        type: String,
        unique: true,
        validate:[validator.isEmail,"Enter valid email"],
        required:[true, "Please enter your email"]

     },
     password:{
        type:String,
        required:   function(){
         return !this.isOauthUser
        }
     
     },
     confirmPassword:{
       type:String,
       required: function(){
         return !this.isOauthUser
        }
     ,
       validate: {
         
        validator: function (el){
         return el === this.password
       },
       message: "Password does not match"
      }
       
     },
     isOauthUser: {type:Boolean, default:false},
     profilePicture:String,
     joinedDate: String,
     resetToken:{ type:String},
     passwordChangedAt: Date,
     passwordResetToken:String,
     passwordResetExpires: Date,
     resetTokenExpiry: {type: Date}
})

user.pre('validate', function(next) {
   if (!this.isOauthUser && !this.password) {
     this.invalidate('password', 'Password is required for non-OAuth users');
   }
   next();
 });

user.pre("save", async function (next) {
   if(this.isOauthUser) {
      this.password = undefined
      next()
   }
   if (!this.isModified("password")) return next();
   this.password = await bcrypt.hash(this.password, 8);
   this.confirmPassword = undefined;
   next();
 });

 user.pre('save', function(next){
   if(this.isOauthUser){
     
         this.password = undefined
         next()
      
   }
       
   if(this.isModified('password') || this.isNew) return next()
   this.passwordChangedAt= Date.now()- 1000
 next()
})

user.methods.correctPassword= async function(candidatePassword, userPassword){
   console.log(await bcrypt.compare(candidatePassword,userPassword))
   return await bcrypt.compare(candidatePassword,userPassword)
 }

const noteUser = mongoose.model('noteUser', user )

module.exports = noteUser