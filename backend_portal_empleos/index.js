require('dotenv').config();
const express = require('express');
const cors = require('cors'); 
const sequelize = require('./config/database');
const userRoutes = require('./routes/users');
const offerRoutes = require('./routes/offers');
const authRoutes = require('./routes/auth');
const Offer = require('./models/Offer');
const app = express();
const port = process.env.PORT || 3000;

//Cors para permitir conexion desde login
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api', authRoutes);

sequelize.sync().then(() => {
  console.log('✅ Conexión con la base de datos establecida.');
  app.listen(port, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
  });
}).catch(err => {
  console.error('❌ Error al conectar con la base de datos:', err);
});
