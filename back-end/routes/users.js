var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10


/* GET users listing. */
router.get('/', function (req, res, next) {
  const pass = "pass"

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(pass, salt, function (err, hash){
      res.send([
        {id: 2, userName: "normal", email:"test@email.com",isAdmin: false, hash: hash},
        {id: 3, userName: "admin", isAdmin: true, email:"test2@email.com", hash: hash},
      ])
    })
  })

})

/* GET user listing. */
router.get('/:id', function (req, res, next) {
  const id = req.params.id

  const pass = "pass"

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(pass, salt, function (err, hash){
      res.send({id: id, userName: "admin", email:"test@email.com", hash: hash, isAdmin: id === "3"})
    })
  })

})

module.exports = router
