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
db.PostureCause = require('../models/posture_cause.js')(sequelize, Sequelize);



if (db.User.associate) db.User.associate(db);
if (db.PostureAnalysis.associate) db.PostureAnalysis.associate(db);
if (db.PostureCorrection.associate) db.PostureCorrection.associate(db);
if (db.UserExerciseLog.associate) db.UserExerciseLog.associate(db);
if (db.DeviceData.associate) db.DeviceData.associate(db);
if (db.Notification.associate) db.Notification.associate(db);
if (db.PostureCause.associate) db.PostureCause.associate(db);



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
        name: 'Retracción escapular',
        description: `Siéntate o párate con la espalda recta. Junta los omóplatos hacia atrás y hacia abajo, como si quisieras "apretar" una pelota entre ellos. Mantén la posición 5-10 segundos y luego relaja. Repite 10-15 veces.`,
        posture: 'Hombros desalineados',
        duration_minutes: 10
      },
      {
        name: 'Estiramiento del pectoral',
        description: `Párate en un marco de puerta con el brazo a 90° apoyado en el marco. Da un paso adelante lentamente hasta sentir un estiramiento suave en el pecho y hombros. Mantén 20-30 segundos. Repite 3 veces por lado.`,
        posture: 'Hombros desalineados',
        duration_minutes: 8
      },
      {
        name: 'Elevación lateral con banda elástica',
        description: `Sujeta una banda elástica con ambas manos frente a ti, con los brazos estirados. Abre los brazos hacia los lados manteniendo la banda tensa, hasta la altura de los hombros. Regresa lentamente. Haz 3 series de 12 repeticiones.`,
        posture: 'Hombros desalineados',
        duration_minutes: 12
      },
      {
        name: 'Ejercicio del "ángel de nieve" en el suelo',
        description: `Acuéstate boca arriba con los brazos a los lados, codos doblados a 90°. Desliza lentamente los brazos hacia arriba sobre la cabeza sin levantar la espalda del suelo. Vuelve a la posición inicial. Realiza 10-15 repeticiones.`,
        posture: 'Hombros desalineados',
        duration_minutes: 10
      },
      {
        name: 'Fortalecimiento del trapecio inferior',
        description: `Colócate boca abajo sobre una superficie o banco. Extiende los brazos hacia adelante en forma de “Y”. Eleva los brazos sin usar el cuello, apretando los omóplatos hacia abajo. Mantén 3 segundos y baja. Haz 3 series de 10 repeticiones.`,
        posture: 'Hombros desalineados',
        duration_minutes: 10
      },
      {
        name: 'Corrección de cabeza caída',
        description: `Siéntate o párate con la espalda recta. Inclina lentamente la cabeza hacia atrás mirando al techo, mantén 5 segundos y regresa. Repite 10 veces para fortalecer los músculos del cuello.`,
        posture: 'Cabeza caída',
        duration_minutes: 7
      },
      {
        name: 'Ejercicio de rotación cervical',
        description: `Gira lentamente la cabeza hacia la derecha hasta sentir un estiramiento, mantén 5 segundos y vuelve al centro. Repite hacia la izquierda. Realiza 3 series de 10 repeticiones.`,
        posture: 'Cabeza desviada hacia la derecha',
        duration_minutes: 7
      },
      {
        name: 'Ejercicio de inclinación lateral del cuello',
        description: `Inclina lentamente la cabeza hacia el hombro derecho manteniendo el hombro relajado, mantén 10 segundos y cambia de lado. Repite 3 veces por lado.`,
        posture: 'Cabeza desviada hacia la izquierda',
        duration_minutes: 6
      },
      {
        name: 'Retracción cervical (chin tuck)',
        description: `Siéntate o párate con la espalda recta. Mete la cabeza hacia atrás, como si quisieras hacer “doble papada”. Mantén 5-10 segundos y relaja. Haz 10-15 repeticiones.`,
        posture: 'Cabeza caída',
        duration_minutes: 8
      },
      {
        name: 'Extensión cervical en posición neutra',
        description: `Acuéstate boca abajo con la frente apoyada en el suelo. Levanta lentamente la cabeza manteniendo la mirada al suelo (sin hiperextender el cuello). Mantén 5 segundos y baja. Repite 10 veces.`,
        posture: 'Cabeza caída',
        duration_minutes: 7
      },
      {
        name: 'Estiramiento del esternocleidomastoideo',
        description: `Gira la cabeza hacia el lado contrario del dolor y luego inclínala suavemente hacia atrás. Mantén 20 segundos. Repite 3 veces por lado.`,
        posture: 'Cabeza caída',
        duration_minutes: 6
      },
      {
        name: 'Estiramiento lateral del cuello',
        description: `Inclina la cabeza hacia la izquierda, acercando la oreja al hombro. Con la mano izquierda, aplica una leve presión para aumentar el estiramiento. Mantén 20-30 segundos. Repite 3 veces.`,
        posture: 'Cabeza desviada hacia la derecha',
        duration_minutes: 7
      },
      {
        name: 'Fortalecimiento del cuello lado izquierdo',
        description: `Acuéstate de lado izquierdo. Levanta la cabeza lateralmente hacia arriba unos 5 cm, sin usar el hombro. Mantén 5 segundos y baja. Haz 3 series de 10 repeticiones.`,
        posture: 'Cabeza desviada hacia la derecha',
        duration_minutes: 8
      },
      {
        name: 'Retracción cervical con énfasis lateral',
        description: `Realiza la retracción cervical (chin tuck), pero enfoca en empujar la cabeza hacia la izquierda. Mantén 5-10 segundos. Haz 10 repeticiones.`,
        posture: 'Cabeza desviada hacia la derecha',
        duration_minutes: 6
      },
      {
        name: 'Estiramiento lateral del cuello',
        description: `Inclina la cabeza hacia la derecha acercando la oreja al hombro. Con la mano derecha, aplica leve presión para intensificar el estiramiento. Mantén 20-30 segundos. Repite 3 veces.`,
        posture: 'Cabeza desviada hacia la izquierda',
        duration_minutes: 7
      },
      {
        name: 'Fortalecimiento del cuello lado derecho',
        description: `Acuéstate de lado derecho. Levanta la cabeza lateralmente unos 5 cm sin usar el hombro. Mantén 5 segundos y baja. Haz 3 series de 10 repeticiones.`,
        posture: 'Cabeza desviada hacia la izquierda',
        duration_minutes: 8
      },
      {
        name: 'Retracción cervical con énfasis lateral',
        description: `Realiza la retracción cervical enfocando en empujar la cabeza hacia la derecha. Mantén 5-10 segundos. Repite 10 veces.`,
        posture: 'Cabeza desviada hacia la izquierda',
        duration_minutes: 6
      },
      {
        name: 'Estiramiento del trapecio superior derecho',
        description: `Inclina la cabeza hacia la izquierda, mirando ligeramente hacia abajo. Con la mano izquierda, sujeta el borde izquierdo de la silla para aumentar el estiramiento. Mantén 20-30 segundos. Repite 3 veces.`,
        posture: 'Hombro derecho más alto',
        duration_minutes: 7
      },
      {
        name: 'Relajación y fortalecimiento escapular',
        description: `Realiza retracción escapular con énfasis en bajar el omóplato derecho. Mantén 5-10 segundos. Haz 15 repeticiones.`,
        posture: 'Hombro derecho más alto',
        duration_minutes: 8
      },
      {
        name: 'Elevación controlada del hombro izquierdo',
        description: `Párate derecho y sube el hombro izquierdo hacia la oreja lentamente. Mantén 3 segundos y baja lentamente. Haz 3 series de 10.`,
        posture: 'Hombro derecho más alto',
        duration_minutes: 6
      },
      {
        name: 'Estiramiento del trapecio superior izquierdo',
        description: `Inclina la cabeza hacia la derecha, mirando ligeramente hacia abajo. Sujeta el borde derecho de la silla con la mano derecha para intensificar el estiramiento. Mantén 20-30 segundos. Repite 3 veces.`,
        posture: 'Hombro izquierdo más alto',
        duration_minutes: 7
      },
      {
        name: 'Retracción escapular con énfasis en bajar el omóplato izquierdo',
        description: `Junta los omóplatos y presiona hacia abajo el izquierdo. Mantén 5-10 segundos. Haz 15 repeticiones.`,
        posture: 'Hombro izquierdo más alto',
        duration_minutes: 8
      },
      {
        name: 'Elevación controlada del hombro derecho',
        description: `Subir y bajar lentamente el hombro derecho. Mantén 3 segundos arriba y baja. 3 series de 10 repeticiones.`,
        posture: 'Hombro izquierdo más alto',
        duration_minutes: 6
      }

    ]);


    await db.User.bulkCreate([
  {
    email: 'usuario1@example.com',
    password: 'password123',
    first_name: 'Juan',
    last_name: 'Pérez',
    date_of_birth: '1990-05-15',
    phone_number: '555-1234',
    blood_type: 'O+',
    allergies: 'Ninguna',
    medical_conditions: 'Ninguna',
    medications: 'Ninguna',
    surgeries: 'Ninguna',
    url_imagen: 'https://example.com/images/juan.jpg'
  },
  {
    email: 'usuario2@example.com',
    password: 'password456',
    first_name: 'Ana',
    last_name: 'Gómez',
    date_of_birth: '1985-03-10',
    phone_number: '555-5678',
    blood_type: 'A-',
    allergies: 'Polen',
    medical_conditions: 'Asma',
    medications: 'Inhalador',
    surgeries: 'Apendicitis',
    url_imagen: 'https://example.com/images/ana.jpg'
  },
  {
    email: 'usuario3@example.com',
    password: 'password789',
    first_name: 'Carlos',
    last_name: 'Martínez',
    date_of_birth: '1978-11-25',
    phone_number: '555-9012',
    blood_type: 'B+',
    allergies: 'Penicilina',
    medical_conditions: 'Hipertensión',
    medications: 'Beta bloqueadores',
    surgeries: 'Cirugía de rodilla',
    url_imagen: 'https://example.com/images/carlos.jpg'
  }
]);

  

    console.log('Ejercicios posturales de prueba insertados correctamente.');
  } catch (error) {
    console.error('Error al insertar los ejercicios de prueba:', error);
  }
};




module.exports = db;
