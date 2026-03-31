const express = require('express');
const subjectsController = require('../controllers/subjectsController');

const router = express.Router();

router.get('/', subjectsController.getAllSubjects);

module.exports = router;
