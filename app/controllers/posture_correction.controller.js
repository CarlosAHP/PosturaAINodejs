const db = require('../config/db.config.js');
const PostureCorrection = db.PostureCorrection;
const User = db.User;

// Crear una nueva corrección postural
exports.create = async (req, res) => {
  try {
    const correction = await PostureCorrection.create({
      user_id: req.body.user_id,
      name: req.body.name,
      description: req.body.description,
      posture: req.body.posture,
      duration_minutes: req.body.duration_minutes
    });
    res.status(201).json(correction);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la corrección postural", error });
  }
};

// Obtener todas las correcciones posturales
exports.findAll = async (req, res) => {
  try {
    const corrections = await PostureCorrection.findAll({
      include: [
        { model: User, as: 'user' }
      ]
    });
    res.status(200).json(corrections);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las correcciones posturales", error });
  }
};

// Obtener una corrección postural por ID
exports.findOne = async (req, res) => {
  try {
    const correction = await PostureCorrection.findByPk(req.params.id, {
      include: [
        { model: User, as: 'user' }
      ]
    });
    if (correction) {
      res.status(200).json(correction);
    } else {
      res.status(404).json({ message: "Corrección no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la corrección", error });
  }
};

// Actualizar una corrección postural
exports.update = async (req, res) => {
  try {
    const [updated] = await PostureCorrection.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedCorrection = await PostureCorrection.findByPk(req.params.id);
      res.status(200).json(updatedCorrection);
    } else {
      res.status(404).json({ message: "Corrección no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la corrección", error });
  }
};

// Eliminar una corrección postural
exports.delete = async (req, res) => {
  try {
    const deleted = await PostureCorrection.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Corrección no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la corrección", error });
  }
};
