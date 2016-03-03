var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));
router.use('/reviews', require('./reviews'));
router.use('/orders', require('./orders'));
router.use('/wines', require('./wines'));

module.exports = router;