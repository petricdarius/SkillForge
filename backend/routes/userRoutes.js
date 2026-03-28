const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);

router.post('/test', (req, res) => {
  res.json({ ok: true });
});

module.exports = router;
