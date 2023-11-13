var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express123' });
});

// router.get('/notes', function(req, res, next) {
//   res.render('notes', { title: 'This is note'});
// });

module.exports = router;
