const express = require('express');
const { getAllOffers, createOffer } = require('../controllers/offerController');
const router = express.Router();

router.get('/', getAllOffers);
router.post('/', createOffer);

module.exports = router;
