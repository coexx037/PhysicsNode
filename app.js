var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
session = require('express-session'),
passport = require('passport'),
connection = require('./db')

connection.connect()

var authRoutes = require('./routes/auth'),
physicsRoutes = require('./routes/physics')

require('./passport')


app
    .set('view engine', 'ejs')
    .use(express.static('public'))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .use(methodOverride('_method'))
    .use(session({secret: 'i love dogs', resave: false, saveUninitialized: false}))
    .use(passport.initialize())
    .use(passport.session())
    .use(authRoutes)
    .use(physicsRoutes)
    .get('/', (req, res, next) => {
        res.render('landing',{
            session: req.session,
            user: req.user,
            authenticated: req.isAuthenticated()
        })
    })
    
    
    
    
    
   .listen(process.env.PORT, process.env.IP, function(){
        console.log('server is running!')
    })