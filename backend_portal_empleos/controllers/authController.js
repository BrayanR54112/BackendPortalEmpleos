const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log('❌ Usuario no encontrado');
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }

    // Agrega estos logs para ver qué se está comparando
    console.log('🔍 Usuario encontrado:', email);
    console.log('🔐 Contraseña enviada:', password);
    console.log('🔐 Contraseña en BD:', user.password);

    const validPassword = await bcrypt.compare(password, user.password);

    console.log('¿Contraseña válida?', validPassword);

    if (!validPassword) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login exitoso',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('❌ Error en login:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
};
