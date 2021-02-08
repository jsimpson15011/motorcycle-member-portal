var express = require('express')
var router = express.Router()

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send([
    {id: 2, userName: "normal", isAdmin: false, hash: "hash"},
    {id: 3, userName: "admin", isAdmin: true, hash: "hash"},
  ])
})

/* GET user listing. */
router.get('/:id', function (req, res, next) {
  const id = req.params.id
  res.send({id: id, userName: "admin", hash: "hash", isAdmin: id === "3"})
})

module.exports = router
