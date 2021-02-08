var express = require('express')
var router = express.Router()
const formSubmissions = [
  {
    id: "4", userId: "2", formContent: {
      fields:
        [
          {name: "name", value: "John Doe"},
          {name: "riderNumber", value: 2},
          {name: "stripePaymentId", value: "pi_1DlITH2eZvKYlo2CuM28qGnc"}
        ]
    }
  },
  {
    id: "6", userId: "3", formContent: {
      fields:
        [
          {name: "name", value: "John Admin"},
          {name: "riderNumber", value: 3},
          {name: "stripePaymentId", value: "pi_1DlITH2eZvKYlo2CuM28qGnc"}
        ]
    }
  },
]

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send(formSubmissions)
})

/* GET user listing. */
router.get('/:id', function (req, res, next) {
  const id = req.params.id
  res.send(formSubmissions.filter(submission => {return submission.id === id}))
})

module.exports = router