const mysql = require('mysql')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const express = require('express')
var app = express()
var bcrypt = require('bcrypt')
var pool = require('./db')
var salt = bcrypt.genSaltSync(10);



var sql = 'select * from user_dfn where email = ?'
var sql2 = 'insert into user_dfn (first_name, last_name, email, password) values (?,?,?,?)' 

//by default, local strategy uses username and password
function authenticate(req, email, password, done){
    pool.getConnection(function(err, connection) {
        connection.query(sql, [email], function(err, rows){
        
        //check if email and passwords match
        if(err){
            connection.release();
            console.log('system error!')
            return done(err);
        }
        if(!rows[0]){
            connection.release();
            return done(null, false, req.flash('loginMessage', 'Incorrect email/password combination.'))
        }
        //compared hashed password to password stored in database
        if(!bcrypt.compareSync(password, rows[0].password)){
            connection.release();
                return done(null, false, req.flash('loginMessage', 'Incorrect email/password combination.'))
            }
        connection.release();
        return done(null, rows[0])
            
        })
    
    if(err){
        console.log(err);
    }
    })
    
    }
        
//by default, local strategy uses username and password
function register(req, email, password, done){
    pool.getConnection(function(err, connection) {
        connection.query(sql, [email], function(err, rows){
        
        //check if user already exists, check if passwords match
        if(err){
            connection.release();
            return done(err)
        }
        if(rows[0]){
            connection.release();
            return done(null, false, req.flash('signupMessage', 'That email is already taken.'))
        }
        if(password != req.body.password2){
            connection.release();
            return done(null, false, req.flash('signupMessage', 'Passwords do not match.'))
        }
        
        //create user with hashed password
        var hash = bcrypt.hashSync(password, salt);
        
        var newUser = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: email,
            password: hash
        }
        
        console.log(newUser);
        
       connection.query(sql2, [newUser.first_name, newUser.last_name, newUser.email, newUser.password], function(err, rows){
           
           if(err){
               connection.release();
               console.log('another error')
               return done(err)
           }
           connection.release();
           newUser.User_ID = rows.insertId;
           return done(null, newUser)
       }) 
        
    })
    if(err){
        console.log(err);
    }
    })
    
}


//using named strategies for login and signup
passport.use('local-login', new LocalStrategy({passReqToCallback: true}, authenticate))
passport.use('local-register', new LocalStrategy({passReqToCallback: true}, register))


// used to serialize user for the session
passport.serializeUser(function(user, done){
    done(null, user.User_ID)
})

//used to deserialize user
passport.deserializeUser(function(id, done){
    
    pool.getConnection(function(err, connection) {
       connection.query('select * from User_Dfn where User_ID = ?', [id], function(err, rows){
           connection.release();
        done(err, rows[0])
    }) 
    if(err){
        console.log(err);
    }
    })
    
    
})
