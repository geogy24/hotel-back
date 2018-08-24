var express = require('express');
var router = express.Router();
var hotels = require('../controllers/hotels');

var multer = require('multer');
var data = multer({dest: 'public/uploads/'});

router.get('/', hotels.list);
router.get('/:id', hotels.getOne);
router.delete('/:id', hotels.delete);
router.post('/', data.any(), hotels.create);
router.post('/find', data.any(), hotels.find);
router.put('/:id', data.any(), hotels.update);

module.exports = router;
