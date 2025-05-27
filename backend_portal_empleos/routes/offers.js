const express = require('express');
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const Offer = require('../models/Offer');

// Crear oferta protegida
router.post('/create', verifyToken('admin'), async (req, res) => {
  const { title, description, career } = req.body;

  try {
    const newOffer = await Offer.create({ title, description, career });
    res.status(201).json({ message: 'Oferta creada exitosamente', offer: newOffer });
  } catch (err) {
    res.status(500).json({ error: 'Error al guardar la oferta' });
  }
});

// Obtener todas las ofertas
router.get('/', async (req, res) => {
  try {
    const offers = await Offer.findAll({ order: [['createdAt', 'DESC']] });
    res.json(offers);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener ofertas' });
  }
});

module.exports = router;
