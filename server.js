const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./app/config/db.config.js');
const cors = require('cors');
require('dotenv').config(); // Cargar variables de entorno desde .env

// Variables de entorno
const dbHost = process.env.DB_HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;
const port = process.env.PORT || 4000;

// Configuración de CORS
const allowedOrigins = ['http://localhost:8080', 'http://localhost:4200'];

const corsOptions = {
  origin: function(origin, callback) {
    // Permitir requests sin origin (como Postman o curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `El CORS no está permitido para el origen: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  optionsSuccessStatus: 200 // Para compatibilidad con navegadores antiguos
};

app.use(cors(corsOptions));

// Configuración de Body-Parser para manejo de JSON
app.use(bodyParser.json());

// Autenticación de la base de datos y sincronización de tablas
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
    await db.initialize(); // Inicialización de la base de datos con datos de prueba si es necesario
  } catch (err) {
    console.error('No se puede conectar a la base de datos:', err);
  }
})();

// Importación de rutas
const router = require('./app/routers/router.js');

// Uso de las rutas
app.use('/', router);

// Ruta de bienvenida
app.get("/", (req, res) => {
  res.json({ message: "Bienvenido Estudiantes de UMG" });
});

// Creación del servidor con puerto dinámico para Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

