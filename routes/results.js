const express = require('express');

let router = express.Router();

router.use(function (req, res, next) {
  next();
});

router.route('/').get((req, res) => {
  res.render('results-35-season-2023-2024');
});

router.route('/35-hooaeg-2023-2024').get((req, res) => {
  res.render('results-35-season-2023-2024');
});

router.route('/34-hooaeg-2022-2023').get((req, res) => {
  res.render('results-34-season-2022-2023');
});

router.route('/33-hooaeg-2021-2022').get((req, res) => {
  res.render('results-33-season-2021-2022');
});

module.exports = router;
