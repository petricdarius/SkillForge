const express = require('express');
const aiController = require('../controllers/aiController');

const router = express.Router();

router.post('/get-answer', aiController.getAnswer);

module.exports = router;
