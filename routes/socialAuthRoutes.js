const router = require('express').Router()
const passport = require('passport')

router.route('/google').get(passport.authenticate('google',{scope:['profile','email']}))
router.route('/google/callback').get(passport.authenticate('google'))
module.exports = router