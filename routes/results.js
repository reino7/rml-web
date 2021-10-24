const express = require('express')
let router = express.Router()

let newDate = new Date(Date.now());


router.use(function (req, res, next) {
  next()
})

router
  .route("/")
  .get((req, res) => {
    res.render("results")
  })


module.exports = router;