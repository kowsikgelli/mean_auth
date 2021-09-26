const router = require('express').Router();
const { application } = require('express');
const passport = require('passport');
const {register,authenticate,profile,socialLogin} = require('../controllers/userControllers')

router.post("/register",register)
router.route("/authenticate").post(authenticate)
router.route("/profile").get(passport.authenticate('jwt',{session:false}),profile)
router.route('/sociallogin').post(socialLogin)
module.exports = router;

//passport.authenticate('jwt',{session:false}),profile