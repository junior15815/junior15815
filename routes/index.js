var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/inscripcion', function(req, res, next) {
  res.render('inscripcion');
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/perfil', function(req, res, next) {
  res.render('perfil', { title: 'Mi perfil' });
});

router.get('/prim', function(req, res, next) {
  res.render('Recapacitacion', { title: 'Express' });
});
router.get('/segun', function(req, res, next) {
  res.render('Mostrarcapacitaciones', { title: 'Express' });
});
router.get('/ulti', function(req, res, next) {
  res.render('Generarpago', { title: 'Express' });
});

router.get('/pcertificado', function(req, res, next) {
  res.render('pcertificado', { title: 'Pagar Certificado' });
});

router.get('/deupendientes', function(req, res, next) {
  res.render('deupendientes', { title: 'Deudas pendientes' });
});

router.get('/gesproseso', function(req, res, next) {
  res.render('gesproseso', { title: 'Gestionar Proseso' });
});

router.get('/pdeudas', function(req, res, next) {
  res.render('pdeudas', { title: 'Pagar Deudas' });
});

router.get('/realizarP', function(req, res, next) {
  res.render('realizarP', { title: 'Realizar Pagos' });
});
router.get('/resultados', function(req, res, next) {
  res.render('resultados', { title: 'Realizar Pagos' });
});

/*M ruta */
router.get('/membresia_pago', function(req, res, next) {
  res.render('membresia_pago', { title: 'Pagar membresia' });
});
router.get('/resultados_c', function(req, res, next) {
  res.render('resultados_c', { title: 'Pagar membresia' });
});
router.get('/ServSoli', function(req, res, next) {
  res.render('ServSoli', { title: 'Servicio Solicitado' });
});
router.get('/VerServ', function(req, res, next) {
  res.render('VerServ', { title: 'Visualizar Servicio' });
});

router.get('/pagocerh', function(req, res, next) {
  res.render('pagocerh', { title: 'Pagar Certificado' });
});

router.get('/certificado', function(req, res, next) {
  res.render('certificado', { title: 'Certificado' });
});


router.post('/main', function(req, res, next) {
  let email = req.body.email;
  let password = req.body.password;
  console.log(email);  
  dbConn.query("SELECT * FROM usuarios WHERE email='"+email+"' AND password='"+password+"'",function(err,rows)     {
    if(err) {
        req.flash('error', err); 
    }else {
      if(rows.length){        
          console.log(rows);
          req.session.idu=rows[0]["id"];
          req.session.email=rows[0]["email"];
          req.session.loggedin = true;
          console.log("inicio")
          res.redirect('/main');
      }
      else{
        req.flash('error','El usuario o contraseña no exixste...');
        res.redirect('/login');
      }
    }
  });

});

router.get('/main', function(req, res, next) {
  if (!req.session.loggedin) {
    res.redirect('/main');
  } else {
    res.render('main');    
  }
  
})

router.get('/logout', function (req, res) {
  req.session.destroy();
  res.redirect('/');
});

router.get('/cliente-list', function(req, res, next) {  
  dbConn.query('SELECT * FROM CLIENTES',function(err,rows)     {
      if(err) {
          req.flash('error', err);
          res.render('clientes/list',{data:''});   
      }else {
          res.render('clientes/list',{data:rows});
      }
  });
});





/*router.get('/main', function(req, res, next) {
  //if(!req.session.loggedin){
  //  res.redirect('/login');
  //}else{
    res.locals.idu=req.session.idu;
    res.locals.email=req.session.email;
    res.locals.loggedin=req.session.loggedin;

    var queries = [
     "SELECT COUNT(idx) as cantidad FROM clientes",
     "SELECT SUM(saldo) as total FROM clientes"
   ];
   
    //dbConn.query('SELECT SUM(saldo) as total FROM clientes',function(err,rows) {
    dbConn.query(queries.join(';'),function(err,rows) {
     //console.log(rows[0].total);
     if(err) throw err;
     //console.log(rows[0][0].cantidad);
     res.render('main',{dataCantidad:rows[0][0].cantidad,dataSaldo:rows[1][0].total});
    });
    
  //}
});*/

module.exports = router;
