const JobOffer = require('../models/JobOffer');

exports.getAllOffers = async (req, res) => {
  try {
    const offers = await JobOffer.findAll();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOffer = async (req, res) => {
  try {
    const offer = await JobOffer.create(req.body);
    res.status(201).json(offer);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
