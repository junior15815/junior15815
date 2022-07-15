var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

router.post('/add', function(req, res, next) {
    console.log(req.body);
    let nombres = req.body.nombres;
    let dni = req.body.dni;
    let celular = req.body.celular;
    let email = req.body.email;
    let errors = false;

    if(!errors) {
        var form_data = {
            nombres: nombres,
            dni: dni,
            celular: celular,
            email: email
        }
    
        // insert query
        dbConn.query('INSERT INTO inscripcion SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                
                // render to add.ejs
                res.render('web/add', {
                    nombres: nombres,
                    dni: dni,
                    celular: celular,
                    email: email                   
                })
            } else {                
                req.flash('success', 'registro successfully ...');
                res.redirect('/');
            }
        })
    }
});

//registrar inscripcion
// router.post('/add', function(req, res, next) {    

//     let nombres = req.body.nombres;
//     let dni = req.body.dni;
//     let celular = req.body.celular;
//     let email = req.body.email;
//     let errors = false;

//     console.log(nombres);
//     // if(name.length === 0 || author.length === 0) {
//     //     errors = true;

//     //     // set flash message
//     //     req.flash('error', "Please enter name and author");
//     //     // render to add.ejs with flash message
//     //     res.render('books/add', {
//     //         name: name,
//     //         author: author
//     //     })
//     // }

//     // if no error
//     if(!errors) {
//         var form_data = {
//             name: nombres,
//             dni: dni,
//             celular: celular,
//             email: email
//         }
        
//         // insert query
//         dbConn.query('INSERT INTO inscripcion SET ?', form_data, function(err, result) {
//             //if(err) throw err
//             if (err) {
//                 req.flash('error', err)
                 
//                 // render to add.ejs
//                 res.render('web/add', {
//                     name: form_data.name,
//                     author: form_data.author                    
//                 })
//             } else {                
//                 req.flash('success', 'registro successfully ...');
//                 res.redirect('/');
//             }
//         })
//     }
// })

module.exports = router;