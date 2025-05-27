const db = require('../models'); // Asegúrate de tener tu modelo de base de datos configurado

const applyForJob = async (req, res) => {
  try {
    const { name, email, offerId } = req.body;
    const cv = req.file; // Archivo CV recibido por multer

    // Aquí deberías guardar la postulación en la base de datos, algo así:
    const application = await db.Application.create({
      name,
      email,
      offerId,
      cvUrl: cv ? cv.path : null, // Guardar la URL del archivo si se subió un CV
    });

    res.status(200).json({ message: 'Postulación exitosa', application });
  } catch (error) {
    console.error('Error al postularse:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

module.exports = { applyForJob };
