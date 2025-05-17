require('dotenv').config(); // Cargar las variables de entorno desde .env

const env = {
  database: process.env.DB_NAME, // Usar la variable de entorno DB_NAME
  username: process.env.DB_USER, // Usar la variable de entorno DB_USER
  password: process.env.DB_PASSWORD, // Usar la variable de entorno DB_PASSWORD
  host: process.env.DB_HOST, // Usar la variable de entorno DB_HOST
  dialect: 'postgres', // Mantén esto como texto
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  ssl: process.env.DB_SSL === 'true' ? { require: true, rejectUnauthorized: false } : false // Usar la variable DB_SSL
};

module.exports = env;
