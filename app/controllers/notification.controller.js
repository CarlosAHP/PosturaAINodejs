// controllers/notification.controller.js
const db = require('../config/db.config.js');
const Notification = db.Notification;
const User = db.User;

// Crear una nueva notificación
exports.create = async (req, res) => {
  try {
    const notification = await Notification.create({
      user_id: req.body.user_id,
      message: req.body.message,
      type: req.body.type,
      read: req.body.read || false
    });
    res.status(201).json(notification);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la notificación", error });
  }
};

// Obtener todas las notificaciones de un usuario
exports.findAll = async (req, res) => {
  try {
    const notifications = await Notification.findAll({
      where: { user_id: req.params.user_id },
      include: [{ model: User, as: 'user' }] // Incluir los datos del usuario asociado
    });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener las notificaciones", error });
  }
};

// Obtener una notificación por ID
exports.findOne = async (req, res) => {
  try {
    const notification = await Notification.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }]
    });
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: "Notificación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la notificación", error });
  }
};

// Marcar una notificación como leída
exports.markAsRead = async (req, res) => {
  try {
    const [updated] = await Notification.update(
      { read: true },
      { where: { id: req.params.id } }
    );
    if (updated) {
      const updatedNotification = await Notification.findByPk(req.params.id);
      res.status(200).json(updatedNotification);
    } else {
      res.status(404).json({ message: "Notificación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al marcar la notificación como leída", error });
  }
};

// Eliminar una notificación
exports.delete = async (req, res) => {
  try {
    const deleted = await Notification.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Notificación no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar la notificación", error });
  }
};
