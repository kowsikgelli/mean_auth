const router = require('express').Router();
const passport = require('passport');
const {register,authenticate,profile} = require('../controllers/userControllers')

router.post("/register",register)
router.route("/authenticate").post(authenticate)
router.route("/profile").get(passport.authenticate('jwt',{session:false}),profile)
module.exports = router;

//passport.authenticate('jwt',{session:false}),profile