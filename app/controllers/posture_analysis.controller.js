const db = require('../config/db.config.js');
const PostureAnalysis = db.PostureAnalysis;
const User = db.User;

// Crear un nuevo análisis postural
exports.create = async (req, res) => {
  try {
    const analysis = await PostureAnalysis.create({
      user_id: req.body.user_id,
      current_posture: req.body.current_posture,
      body_part: req.body.body_part,
      status: req.body.status
    });
    res.status(201).json(analysis);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el análisis postural", error });
  }
};

// Obtener todos los análisis posturales
exports.findAll = async (req, res) => {
  try {
    const analyses = await PostureAnalysis.findAll({
      include: [{ model: User, as: 'user' }]
    });
    res.status(200).json(analyses);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los análisis posturales", error });
  }
};

// Obtener un análisis postural por ID
exports.findOne = async (req, res) => {
  try {
    const analysis = await PostureAnalysis.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }]
    });
    if (analysis) {
      res.status(200).json(analysis);
    } else {
      res.status(404).json({ message: "Análisis no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el análisis", error });
  }
};

// Actualizar un análisis postural
exports.update = async (req, res) => {
  try {
    const [updated] = await PostureAnalysis.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedAnalysis = await PostureAnalysis.findByPk(req.params.id);
      res.status(200).json(updatedAnalysis);
    } else {
      res.status(404).json({ message: "Análisis no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el análisis", error });
  }
};

// Eliminar un análisis postural
exports.delete = async (req, res) => {
  try {
    const deleted = await PostureAnalysis.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Análisis no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el análisis", error });
  }
};
