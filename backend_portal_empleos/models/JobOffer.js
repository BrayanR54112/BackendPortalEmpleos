const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const JobOffer = sequelize.define('JobOffer', {
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  career: DataTypes.STRING, // Ingeniería, Contaduría, etc.
});

module.exports = JobOffer;
