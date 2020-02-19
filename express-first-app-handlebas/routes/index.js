var express = require('express');
var router = express.Router();

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Form Validation', success: req.session.success, errors: req.session.errors });
  req.session.errors = null;
});

router.post('/submit', function(req, res, next){
  // Check Validity
  req.check('email', 'Invalid email address').isEmail();
  req.check('password', 'Password is Invalid').isLength({min:4}).equals(req.body.confirmPassword)

  var errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/');

});

// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express', condition: false, anyArray: [1,2,3] });
// });

// router.get('/test/:id', function( req, res, next){
//   res.render('test', { output: req.params.id })
// });

// router.post('/test/submit', function( req, res, next){
//   var id = req.body.id;
//   res.redirect('/test/' + id)
// })

module.exports = router;
