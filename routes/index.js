var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ message: 'Bienvenido a StarMink Store' });
});

module.exports = router;
