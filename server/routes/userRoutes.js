const express = require('express')
const authrouter = express.Router()
const googleAuth = require('./../controllers/googleAuth')
const authController = require("./../controllers/authController")
 const authenticate = require('./../controllers/resetAuthController')

authrouter.post('/signup',authController.signup)
authrouter.post('/login',authController.login)
authrouter.get('/verify',authController.auth)
authrouter.get('/google', googleAuth.authGoogle);
authrouter.get('/google/oauth2callback',googleAuth.authorize);
authrouter.post('/logout',authController.logout)
authrouter.delete('/delete',authController.deleteAcc)

// resetPassword route

authrouter.post('/resetPassword', authenticate.resetPassword1)
authrouter.post('/resetPassword/:token', authenticate.resetPassword2)
module.exports = authrouter