const mysql = require('mysql')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const express = require('express')
var app = express()
var bcrypt = require('bcrypt-nodejs')
var connection = require('./db')


var sql = 'select * from User_Dfn where email = ?'
var sql2 = 'insert into User_Dfn (first_name, last_name, email, password) values (?,?,?,?)' 

function authenticate(email, password, done){
    connection.query(sql, [email], function(err, rows){
        
        if(err){
            console.log('system error!')
            return done(err);
        }
        if(!rows || !bcrypt.compareSync(password, rows[0].password)){
            console.log('cant find in db!')
            return done(null, false, {message: 'Incorrect password or username'})
        }
        return done(null, rows[0])
    })
}

function register(req, email, password, done){
    connection.query(sql, [email], function(err, rows){
        
        if(err){
            return done(err)
        }
        if(rows[0]){
            return done(null, false, {message: 'an account with that email has already been created'})
        }
        if(password != req.body.password2){
            return done(null, false, {message: 'passwords dont match'})
        }
        
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: email,
            password: bcrypt.hashSync(password),
        }
        
  
        
       connection.query(sql2, [newUser.first_name, newUser.last_name, newUser.email, newUser.password], function(err, rows){
           
           if(err){
               console.log('another error')
               return done(err)
           }
           newUser.User_ID = rows.insertId;
           return done(null, newUser)
       }) 
        
    })
}



passport.use(new LocalStrategy(authenticate))
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register))

passport.serializeUser(function(user, done){
    done(null, user.User_ID)
})

passport.deserializeUser(function(id, done){
    
    connection.query('select * from User_Dfn where User_ID = ?', [id], function(err, rows){
        done(err, rows[0])
    })
    
})
