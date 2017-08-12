var passport = require('passport'),
router = require('express').Router(),
mysql = require('mysql'),
pool = require('../db')
var sql1 = require('../query1')
var solve_library = require('../solve_library')

var sql2 = 'delete from probs where username = ?'

var sql3 = 'insert into probs (direction, variable, val, solveFor, units, username, varSolve) values (?,?,?,?,?,?,?)'

router
    .get('/block', function(req, res){
        if(req.isAuthenticated()){
            res.render('block', {
            session: req.session,
            user: req.user,
            authenticated: req.isAuthenticated()
        })
        }
        else{
            res.redirect('/login')
        }
    })
    
   .post('/block', function(req, res){
        
        
        var u = req.user.User_ID
        var vall = req.body.vals
        var units = req.body.units
        var solve = req.body.solve_data
        var solveUnits = req.body.solve_units
        var direction = req.body.direction
        
        
        pool.getConnection(function(err, connection){
            
//delete current problem set for the given user 
        connection.query(sql2, [u])
        
//insert new problem set for the given user        
        connection.query(sql3, [direction, solve, null, 's', solveUnits, u, 's'+solve])
        
        for(var key in vall) { 
            if(vall[key]){

                connection.query(sql3, [direction, key, vall[key], null, units[key], u, key])
            }
        }
        
        var inserts = [u,u,u,u,u,u,u,u,u]

//query database and return the most complete solution for the given inputs
        connection.query(sql1, inserts, function(err, results){
            if(err){
                connection.release();
                console.log(err)
            }else{
                
                connection.release();
                var solveline = results[0]
                var solution = results[1]

            if(solution.length > 0){
                
            var solve_obj = {};
            
//populate solve object            
            solution.forEach(function(obj, index){
                    solve_obj[obj.varsolve] = obj.converted_value;
            })
            
//return solution from solve object          
            var solve_lib = solve_library(solve_obj);
            var solve_key = solution[0].conc;
            var solve_conversion = solution[0].solve_conversion;
            
//produce answer array containing solve variable, solve units and solve value       
            var answer = [{
                solve: solve,
                solveUnits: solveUnits,
                answer: solve_lib[solve_key]*solve_conversion
                
            }]
            
//populate the solve template with the solution            
            res.render('solve', {solveline: solveline, solution: answer})
                
                
            }else{
                res.render('no_solve')
            }

                

            }
        })
        })

        
   })


module.exports = router;