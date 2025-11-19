var express = require('express');
var router = express.Router();

var productsController = require('../controllers/productsController');

router.get('/', productsController.list);
router.get('/last', productsController.last);
router.get('/:id', productsController.detail);
router.post('/', productsController.create);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.remove);

module.exports = router;
