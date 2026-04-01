const express = require('express');

const unitController = require('../controllers/unitController');

const router = express.Router();

router.get('/:subSlug/:id', unitController.getUnit);

module.exports = router;
