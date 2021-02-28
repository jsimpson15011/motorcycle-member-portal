var express = require('express')
var router = express.Router()
const bcrypt = require('bcrypt')
const saltRounds = 10

let fakeUsers = [
  {id: 2, userName: "normal", email: "test@email.com", isAdmin: false, hash: "fakehash"},
  {id: 3, userName: "admin", isAdmin: true, email: "test2@email.com", hash: "fakehash"},
]

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(fakeUsers)
})

/* GET user listing. */
router.get('/:id', function (req, res, next) {
  const id = req.params.id

  const pass = "pass"

  const user = fakeUsers.filter(user => {
    return user.id === id
  })[0]

  res.send(user ? user : "User Not Found")

})

/*POST new user*/
router.post('/', function (req, res, next) {
  const newUser = req.body
  const nextId = fakeUsers[fakeUsers.length - 1].id + 1 // When we set up a database we'll just use the autoincrement

  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(newUser.password, salt, function (err, hash) {
      fakeUsers.push({
        id: nextId,
        userName: newUser.userName,
        isAdmin: newUser.isAdmin,
        email: newUser.email,
        hash: hash
      })
      res.send().status(200)
    })
  })
})

module.exports = router
