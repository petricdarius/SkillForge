const express = require('express');
const subjectsController = require('../controllers/subjectsController');

const router = express.Router();

router.get('/', subjectsController.getAllSubjects);
router.get('/:slug', subjectsController.getOneSubject);

module.exports = router;
