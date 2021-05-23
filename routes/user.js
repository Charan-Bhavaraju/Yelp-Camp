const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const User = require('../models/user')
const users = require('../contollers/users')
const catchAsync = require('../utilities/catchAsync')
const ExpressError = require('../utilities/ExpressError')

router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register))

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;