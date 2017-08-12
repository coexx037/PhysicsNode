var passport = require('passport')
var router = require('express').Router();

router
   .get('/login', (req, res, next) => {
    res.render('login', { message: req.flash('loginMessage') })
   })
   .post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
   }))
   .get('/signup', (req, res, next) => {
    res.render('signup', { message: req.flash('signupMessage') })
   })
   .post('/signup', passport.authenticate('local-register', {
    successRedirect: '/',
    failureRedirect: '/signup'
   }))
   .get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
   })


module.exports = router