let express = require('express');
let router = express.Router();

const userController = require('../controllers/user.controller.js');
const postureExerciseController = require('../controllers/posture_exercise.controller.js');
const postureAnalysisController = require('../controllers/posture_analysis.controller.js');
const postureCorrectionController = require('../controllers/posture_correction.controller.js');
const userExerciseLogController = require('../controllers/user_exercise_log.controller.js');
const deviceDataController = require('../controllers/device_data.controller.js');
const notificationController = require('../controllers/notification.controller.js');
const postureCauseController = require('../controllers/posture_cause.controller.js');


router.post('/posture-causes', postureCauseController.create);
router.get('/posture-causes', postureCauseController.findAll);


// Rutas para operaciones CRUD
router.post('/users', userController.create);       // Crear un nuevo usuario
router.get('/users', userController.findAll);        // Obtener todos los usuarios
router.get('/users/:id', userController.findOne);    // Obtener un usuario por ID
router.put('/users/:id', userController.update);     // Actualizar un usuario
router.delete('/users/:id', userController.delete);  // Eliminar un usuario
router.post('/login', userController.login);         // Login
// Rutas para operaciones CRUD
router.post('/posture-exercises', postureExerciseController.create); // Crear un nuevo ejercicio
router.get('/posture-exercises', postureExerciseController.findAll); // Obtener todos los ejercicios
router.get('/posture-exercises/:id', postureExerciseController.findOne); // Obtener un ejercicio por ID
router.put('/posture-exercises/:id', postureExerciseController.update); // Actualizar un ejercicio
router.delete('/posture-exercises/:id', postureExerciseController.delete); // Eliminar un ejercicio

// Rutas para operaciones CRUD
router.post('/posture-analyses', postureAnalysisController.create); // Crear un nuevo análisis
router.get('/posture-analyses', postureAnalysisController.findAll); // Obtener todos los análisis
router.get('/posture-analyses/:id', postureAnalysisController.findOne); // Obtener un análisis por ID
router.put('/posture-analyses/:id', postureAnalysisController.update); // Actualizar un análisis
router.delete('/posture-analyses/:id', postureAnalysisController.delete); // Eliminar un análisis

// Rutas para operaciones CRUD
router.post('/posture-corrections', postureCorrectionController.create); // Crear una nueva corrección
router.get('/posture-corrections', postureCorrectionController.findAll); // Obtener todas las correcciones
router.get('/posture-corrections/:id', postureCorrectionController.findOne); // Obtener una corrección por ID
router.put('/posture-corrections/:id', postureCorrectionController.update); // Actualizar una corrección
router.delete('/posture-corrections/:id', postureCorrectionController.delete); // Eliminar una corrección

// Rutas para operaciones CRUD
router.post('/user-exercise-logs', userExerciseLogController.create); // Crear un nuevo registro de ejercicio
router.get('/user-exercise-logs', userExerciseLogController.findAll); // Obtener todos los registros de ejercicios
router.get('/user-exercise-logs/:id', userExerciseLogController.findOne); // Obtener un registro de ejercicio por ID
router.put('/user-exercise-logs/:id', userExerciseLogController.update); // Actualizar un registro de ejercicio
router.delete('/user-exercise-logs/:id', userExerciseLogController.delete); // Eliminar un registro de ejercicio

// Rutas para operaciones CRUD
router.post('/device-data', deviceDataController.create); // Crear un nuevo registro de datos del dispositivo
router.get('/device-data', deviceDataController.findAll); // Obtener todos los registros de datos del dispositivo
router.get('/device-data/:id', deviceDataController.findOne); // Obtener un registro de datos del dispositivo por ID
router.put('/device-data/:id', deviceDataController.update); // Actualizar los datos del dispositivo
router.delete('/device-data/:id', deviceDataController.delete); // Eliminar un registro de datos del dispositivo

// Rutas para operaciones CRUD
router.post('/notifications', notificationController.create); // Crear una nueva notificación
router.get('/notifications/:user_id', notificationController.findAll); // Obtener todas las notificaciones de un usuario
router.get('/notifications/:id', notificationController.findOne); // Obtener una notificación por ID
router.put('/notifications/:id/read', notificationController.markAsRead); // Marcar una notificación como leída
router.delete('/notifications/:id', notificationController.delete); // Eliminar una notificación




module.exports = router;
