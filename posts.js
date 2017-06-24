var passport = require('passport')
var router = require('express').Router()
var db = require('../db')

router
    .get('/physics', (req, res, next) => {
        
    })


var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mysql = require('mysql'),
session = require('express-session')

require('./passport')



app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(methodOverride('_method'))
app.use(session({secret: 'i love dogs', resave: false, saveUninitialized: false}))

connection.connect();

var sql1 = require('./query1')

app.get('/physics', function(req, res){
    
    var inserts = [1,1,1,1,1,1,1,1,1]
    
    sql1 = mysql.format(sql1, inserts)
    
    connection.query(sql1, function(err, results){
        if(err){
            console.log(err)
        }else{
            console.log(results)
         res.render('index', {
             results1: results[0],
             results2: results[1]
         })
        }
    })
    
    connection.end()
    
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('server is running!')
})