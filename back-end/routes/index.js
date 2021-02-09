var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let visits
  if (req.session.views){
    visits = req.session.views++
  } else {
    visits = 0
    req.session.views += 1
  }
  res.render('index', { title: 'Express', visits: visits });
});

module.exports = router;
