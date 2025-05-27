const jwt = require('jsonwebtoken');
require('dotenv').config();
const { User } = require('../models/User');

const verifyToken = (roleRequired = 'user') => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token no proporcionado' });
    }

    const token = authHeader.split(' ')[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
      const user = await User.findByPk(decoded.id); // Obtener el usuario desde la base de datos

      if (!user || (roleRequired && user.role !== roleRequired)) {
        return res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
      }

      req.user = user; // Agregar información del usuario a la solicitud
      next();
    } catch (error) {
      return res.status(403).json({ error: 'Token inválido' });
    }
  };
};

module.exports = verifyToken;
