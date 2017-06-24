var passport = require('passport')
var router = require('express').Router();

router
   .get('/login', (req, res, next) => {
    res.render('login')
   })
   .post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
   }))
   .get('/signup', (req, res, next) => {
    res.render('signup')
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