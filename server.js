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

// Configuración de CORS: permite peticiones preflight y métodos desde orígenes autorizados
const allowedOrigins = ['http://localhost:8080', 'http://localhost:4200'];
const corsOptions = {
  origin: function (origin, callback) {
    // Permitir requests sin origin (Postman, curl)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `El CORS no está permitido para el origen: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200 // Para compatibilidad con navegadores antiguos
};

// 1) Habilita CORS globalmente
app.use(cors(corsOptions));

// 2) Responde a peticiones OPTIONS de preflight
app.options('*', cors(corsOptions));

// Configuración de Body-Parser para manejo de JSON
app.use(bodyParser.json());

// Autenticación de la base de datos y sincronización de tablas
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión establecida correctamente.');
    await db.initialize(); // Inicialización de la base de datos si es necesario
  } catch (err) {
    console.error('No se puede conectar a la base de datos:', err);
  }
})();

// Importación y uso de rutas
const router = require('./app/routers/router.js');
app.use('/', router);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido Estudiantes de UMG' });
});

// Creación del servidor con puerto dinámico para Render
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

