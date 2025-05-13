const express = require('express');
const { createUser } = require('../controllers/userController');
const router = express.Router();
const { register } = require('../controllers/userController');

router.post('/', createUser);
router.post('/register', register);

module.exports = router;
