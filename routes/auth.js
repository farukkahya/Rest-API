const express = require('express');
const { register, login } = require('../controllers/auth.js');

const router = express.Router();

// isteklere göre çalışıcak fonksiyonlar eşleniyor
router.post('/register', register)
router.post('/login', login)


module.exports = router