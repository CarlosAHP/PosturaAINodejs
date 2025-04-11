const env = require('./env.js');
const bcrypt = require('bcrypt');  // Asegúrate de importar bcrypt al inicio
const { Sequelize } = require('sequelize');

// Confirmamos el valor de dialecto para asegurar que es una cadena de texto
console.log('Dialect:', env.dialect); // Esto debería mostrar "postgres"

// Inicialización de Sequelize
const sequelize = new Sequelize(env.database, env.username, env.password, {
  host: env.host,
  dialect: env.dialect,
  dialectOptions: {
    ssl: env.ssl, // Usa directamente el objeto ssl desde env.js
  },
  pool: env.pool,
});

const db = {};

// Asignamos Sequelize y la instancia a db
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importación de modelos

db.User = require('../models/user.model.js')(sequelize, Sequelize);
db.PostureExercise = require('../models/posture_exercise.model.js')(sequelize, Sequelize);
db.PostureAnalysis = require('../models/posture_analysis.model.js')(sequelize, Sequelize);
db.PostureCorrection = require('../models/posture_correction.model.js')(sequelize, Sequelize);
db.UserExerciseLog = require('../models/user_exercise_log.model.js')(sequelize, Sequelize);
db.DeviceData = require('../models/device_data.model.js')(sequelize, Sequelize);
db.Notification = require('../models/notification.model.js')(sequelize, Sequelize);



if (db.User.associate) db.User.associate(db);
if (db.PostureAnalysis.associate) db.PostureAnalysis.associate(db);
if (db.PostureCorrection.associate) db.PostureCorrection.associate(db);
if (db.UserExerciseLog.associate) db.UserExerciseLog.associate(db);
if (db.DeviceData.associate) db.DeviceData.associate(db);
if (db.Notification.associate) db.Notification.associate(db);



// Función para inicializar la base de datos con datos predefinidos
db.initialize = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Base de datos sincronizada correctamente.');
    
    // Insertar datos de prueba
    await insertSamplePostureExercises();
    console.log('Datos de prueba insertados correctamente.');


  } catch (error) {
    console.error('Error al inicializar la base de datos:', error);
  }
};



// Función para insertar datos de prueba en la tabla posture_exercise
const insertSamplePostureExercises = async () => {
  try {
    await db.PostureExercise.bulkCreate([
      {
        name: 'Postura de la cobra',
        description: 'Una postura que estira la espalda baja y abre el pecho.',
        duration_minutes: 5,
        difficulty_level: 'Intermedio'
      },
      {
        name: 'Postura de la silla',
        description: 'Fortalece las piernas y mejora el equilibrio.',
        duration_minutes: 3,
        difficulty_level: 'Fácil'
      }
      // Puedes agregar más datos de prueba aquí
    ]);


    await db.User.bulkCreate([
      {
        email: 'usuario1@example.com',
        password: 'password123',
        first_name: 'Juan',
        last_name: 'Pérez',
        date_of_birth: '1990-05-15',
        phone_number: '555-1234'
      },
      {
        email: 'usuario2@example.com',
        password: 'password456',
        first_name: 'Ana',
        last_name: 'Gómez',
        date_of_birth: '1985-03-10',
        phone_number: '555-5678'
      }
      // Puedes agregar más usuarios de prueba aquí
    ]);


    await db.PostureAnalysis.bulkCreate([
      {
        user_id: 1,  // Este debe ser un ID válido de un usuario que ya exista
        posture_score: 85.5,
        status: 'Completado'
      },
      {
        user_id: 2,  // Este debe ser otro ID válido de un usuario existente
        posture_score: 72.3,
        status: 'En progreso'
      }
      // Puedes agregar más análisis de prueba aquí
    ]);


    await db.PostureCorrection.bulkCreate([
      {
        user_id: 1,  // Este debe ser un ID válido de un usuario que ya exista
        posture_analysis_id: 1, // Este debe ser un ID válido de un análisis de postura
        suggested_correction: 'Realiza estiramientos para mejorar la postura.',
        duration_minutes: 10
      },
      {
        user_id: 2, // Otro ID de usuario
        posture_analysis_id: 2, // Otro ID de análisis de postura
        suggested_correction: 'Corrige la alineación de tu espalda.',
        duration_minutes: 12
      }
      // Puedes agregar más correcciones de prueba aquí
    ]);
    


    await db.UserExerciseLog.bulkCreate([
      {
        user_id: 1,  // Este debe ser un ID válido de un usuario que ya exista
        exercise_id: 1, // Este debe ser un ID válido de un ejercicio postural
        duration_minutes: 10,
        completed: true
      },
      {
        user_id: 2,  // Otro ID de usuario
        exercise_id: 2, // Otro ID de ejercicio postural
        duration_minutes: 12,
        completed: false
      }

        // Puedes agregar más registros de ejercicios de prueba aquí
    ]);

    await db.DeviceData.bulkCreate([
      {
        user_id: 1,  // Este debe ser un ID válido de un usuario que ya exista
        device_type: 'Smartphone',
        posture_data: { "posture": "good", "angle": 30 },
      },
      {
        user_id: 2,  // Este debe ser otro ID de usuario válido
        device_type: 'Tablet',
        posture_data: { "posture": "poor", "angle": 45 },
      }
      // Puedes agregar más datos de prueba aquí
    ]);



    await db.Notification.bulkCreate([
      {
        user_id: 1,  // Este debe ser un ID válido de un usuario que ya exista
        message: 'Recuerda realizar tu rutina de ejercicios de postura.',
        type: 'Recordatorio',
        read: false
      },
      {
        user_id: 2,  // Otro ID de usuario válido
        message: 'Tu análisis de postura está listo. Consulta los resultados.',
        type: 'Resultado de análisis',
        read: false
      }
      // Puedes agregar más datos de prueba aquí
    ]);
  

    console.log('Ejercicios posturales de prueba insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar los ejercicios de prueba:', error);
  }
};




module.exports = db;
