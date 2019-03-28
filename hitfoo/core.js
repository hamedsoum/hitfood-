    
var mysql = require('promise-mysql');
 var express = require('express');
 var twig = require('twig');
 const bodyparser = require('body-parser')
 var session = require('express-session')
 var path = require('path')
 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'hitfood'
}).then(function(db){
    // do stuff with conn
    console.log("connexion à la base de donnée")
    var app = express();
    app.use(session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    }));
    app.use(express.static("views"))
    app.use(bodyparser.urlencoded({extended: true}))
    app.use(bodyparser.json())
    app.set('view engine', 'twig'); 
    
   
// respond with "hello world" when a GET request is made to the homepage
app.get('/', function(req, res) {
   
  res.render('index',);
    
});
app.get('/inscrip', function(req, res) {
   
  res.render('inscrip',);
    
});

app.get('/reserv', function(req, res) {
   
  res.render('reserv',);
    
});
app.get('/espace', function(req, res) {
   
  res.render('espace',);
    
});
app.get('/inscription', function(req, res) {
   
    res.render('inscription');
      
  });
app.post('/traitement',function(req, res){
        let values = [req.body.name, req.body.email,req.body.tel,req.body.password,req.body.passwordd ]
        db.query('INSERT INTO clients(name,email,tel,password,passwordd) VALUE(?,?,?,?,?)', values,function(err,result){
            if(!err)
            res.redirect('/inscrip')
            else
            res.render("/inscription")
        })
})
  app.get('/reservation', function(req, res) {
   
    res.render('reservation');
  });
  app.post('/reserv',function(req, res){
    let val = [req.body.nom, req.body.prenom,req.body.email,req.body.nbrpers,req.body.tel,req.body.date,req.body.time,req.body.message ]
    db.query('INSERT INTO reservation(nom,prenom,email,nbrpers,tel,date,time,message) VALUE(?,?,?,?,?,?,?,?)', val,function(err,result){
        if(!err)
       
        res.redirect('/reserv' );
        else
        
        res.render("/reservation")
    })
})


app.get('/membre', function(req, res) {
   
  res.render('membre',);
    
});
  app.post('/traitement',function(req, res){
    console.log(req.body)
    res.end('formulaire soumis')
})
  app.get('/connexion', function(req, res) {
   
    res.render('connexion',);
      
  });
  app.post('/auth',function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    var info = {
      email:email,
      password:password
    }
   
    if (email && password) {
      db.query('SELECT * FROM clients WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
        if (results.length > 0) {
          req.session.loggedin = true;
         
          res.redirect('/espace')
        } else {
          res.send('email et/ou  mot de passe incorrect ');
        }	
          res.end();	
      });
    } else {
      res.send('entrez un email et un mot de passe');
      res.end();
    }
})
app.listen(8080)
    
})
