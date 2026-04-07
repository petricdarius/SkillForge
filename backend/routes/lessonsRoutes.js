const express = require('express');
const lessonsController = require('../controllers/lessonsController');

const router = express.Router();

router.get('/:unitSlug/lesson/:id', lessonsController.getLesson);

module.exports = router;
