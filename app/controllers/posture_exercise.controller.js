// controllers/posture_exercise.controller.js
const db = require('../config/db.config.js');
const PostureExercise = db.PostureExercise;

// Crear un nuevo ejercicio postural
exports.create = async (req, res) => {
  try {
    const exercise = await PostureExercise.create({
      name: req.body.name,
      description: req.body.description,
      duration_minutes: req.body.duration_minutes,
      difficulty_level: req.body.difficulty_level
    });
    res.status(201).json(exercise);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el ejercicio postural", error });
  }
};

// Obtener todos los ejercicios posturales
exports.findAll = async (req, res) => {
  try {
    const exercises = await PostureExercise.findAll();
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los ejercicios posturales", error });
  }
};

// Obtener un ejercicio postural por ID
exports.findOne = async (req, res) => {
  try {
    const exercise = await PostureExercise.findByPk(req.params.id);
    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(404).json({ message: "Ejercicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el ejercicio", error });
  }
};

// Actualizar un ejercicio postural
exports.update = async (req, res) => {
  try {
    const [updated] = await PostureExercise.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedExercise = await PostureExercise.findByPk(req.params.id);
      res.status(200).json(updatedExercise);
    } else {
      res.status(404).json({ message: "Ejercicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el ejercicio", error });
  }
};

// Eliminar un ejercicio postural
exports.delete = async (req, res) => {
  try {
    const deleted = await PostureExercise.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Ejercicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el ejercicio", error });
  }
};
