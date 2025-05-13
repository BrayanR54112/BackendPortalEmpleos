require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const offerRoutes = require('./routes/offers');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);

sequelize.sync().then(() => {
  console.log('✅ Conexión con la base de datos establecida.');
  app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('❌ Error al conectar con la base de datos:', err);
});
