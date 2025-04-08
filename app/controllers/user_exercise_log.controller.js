// controllers/user_exercise_log.controller.js
const db = require('../config/db.config.js');
const UserExerciseLog = db.UserExerciseLog;
const User = db.User;
const PostureExercise = db.PostureExercise;

// Crear un nuevo registro de ejercicio
exports.create = async (req, res) => {
  try {
    const exerciseLog = await UserExerciseLog.create({
      user_id: req.body.user_id,
      exercise_id: req.body.exercise_id,
      duration_minutes: req.body.duration_minutes,
      completed: req.body.completed
    });
    res.status(201).json(exerciseLog);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el registro de ejercicio", error });
  }
};

// Obtener todos los registros de ejercicios
exports.findAll = async (req, res) => {
  try {
    const exerciseLogs = await UserExerciseLog.findAll({
      include: [
        { model: User, as: 'user' },
        { model: PostureExercise, as: 'posture_exercise' }
      ]
    });
    res.status(200).json(exerciseLogs);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los registros de ejercicios", error });
  }
};

// Obtener un registro de ejercicio por ID
exports.findOne = async (req, res) => {
  try {
    const exerciseLog = await UserExerciseLog.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' },
        { model: PostureExercise, as: 'posture_exercise' }
      ]
    });
    if (exerciseLog) {
      res.status(200).json(exerciseLog);
    } else {
      res.status(404).json({ message: "Registro de ejercicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el registro de ejercicio", error });
  }
};

// Actualizar un registro de ejercicio
exports.update = async (req, res) => {
  try {
    const [updated] = await UserExerciseLog.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedExerciseLog = await UserExerciseLog.findByPk(req.params.id);
      res.status(200).json(updatedExerciseLog);
    } else {
      res.status(404).json({ message: "Registro de ejercicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el registro de ejercicio", error });
  }
};

// Eliminar un registro de ejercicio
exports.delete = async (req, res) => {
  try {
    const deleted = await UserExerciseLog.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Registro de ejercicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el registro de ejercicio", error });
  }
};
