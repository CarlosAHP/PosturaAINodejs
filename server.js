const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./app/config/db.config.js');
require('dotenv').config(); // Cargar variables de entorno desde .env

// Variables de entorno
const port = process.env.PORT || 4000;

// Configuración de CORS: permite preflight y métodos desde orígenes autorizados
const allowedOrigins = ['http://localhost:8080', 'http://localhost:4200'];
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true); // Postman, curl
    if (!allowedOrigins.includes(origin)) {
      return callback(new Error(`CORS no permitido para origen: ${origin}`), false);
    }
    return callback(null, true);
  },
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  optionsSuccessStatus: 200
};

const app = express();

// 1) Habilita CORS globalmente para todas las rutas
app.use(cors(corsOptions));

// 2) Maneja preflight OPTIONS
app.options('*', cors(corsOptions));

// 3) Body parser para JSON
app.use(bodyParser.json());

// Conexión a la base de datos
(async () => {
  try {
    await db.sequelize.authenticate();
    console.log('Conexión a BD establecida.');
    await db.initialize();
  } catch (err) {
    console.error('Error de conexión a BD:', err);
  }
})();

// Rutas
const router = require('./app/routers/router.js');
app.use('/', router);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido Estudiantes de UMG' });
});

// Levantar servidor
app.listen(port, '0.0.0.0', () => {
  console.log(`Servidor corriendo en puerto ${port}`);
});

