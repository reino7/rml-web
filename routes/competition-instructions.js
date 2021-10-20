const express = require('express');
let router = express.Router();

let newDate = new Date(Date.now());


router.use(function (req, res, next) {
  console.log(`${newDate.toLocaleDateString()} ${newDate.toLocaleTimeString()}`, "@", req.url)
  next();
});

router
  .route("/")
  .get((req, res) => {
    res.render("competition-instructions");
  })


module.exports = router;