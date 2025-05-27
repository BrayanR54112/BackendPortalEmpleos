const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: DataTypes.STRING,
  role: { 
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'user', 
  },
});

module.exports = User;
