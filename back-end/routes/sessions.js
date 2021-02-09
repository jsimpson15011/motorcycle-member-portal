var express = require('express')
var router = express.Router()


router.delete('/', function (req, res, next) {
  req.session.destroy(function(err) {
    // cannot access session here
  })
  res.status(204).end();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  req.session.destroy(function (err) {
    res.render('clear-session');
  })
});

module.exports = router
