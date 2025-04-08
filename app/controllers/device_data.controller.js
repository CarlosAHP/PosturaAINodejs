// controllers/device_data.controller.js
const db = require('../config/db.config.js');
const DeviceData = db.DeviceData;
const User = db.User;

// Crear un nuevo registro de datos del dispositivo
exports.create = async (req, res) => {
  try {
    const deviceData = await DeviceData.create({
      user_id: req.body.user_id,
      device_type: req.body.device_type,
      posture_data: req.body.posture_data
    });
    res.status(201).json(deviceData);
  } catch (error) {
    res.status(500).json({ message: "Error al crear los datos del dispositivo", error });
  }
};

// Obtener todos los registros de datos del dispositivo
exports.findAll = async (req, res) => {
  try {
    const deviceDatas = await DeviceData.findAll({
      include: [{ model: User, as: 'user' }] // Incluir los datos del usuario asociado
    });
    res.status(200).json(deviceDatas);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos del dispositivo", error });
  }
};

// Obtener un registro de datos del dispositivo por ID
exports.findOne = async (req, res) => {
  try {
    const deviceData = await DeviceData.findByPk(req.params.id, {
      include: [{ model: User, as: 'user' }] // Incluir los datos del usuario asociado
    });
    if (deviceData) {
      res.status(200).json(deviceData);
    } else {
      res.status(404).json({ message: "Datos del dispositivo no encontrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los datos del dispositivo", error });
  }
};

// Actualizar los datos del dispositivo
exports.update = async (req, res) => {
  try {
    const [updated] = await DeviceData.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedDeviceData = await DeviceData.findByPk(req.params.id);
      res.status(200).json(updatedDeviceData);
    } else {
      res.status(404).json({ message: "Datos del dispositivo no encontrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar los datos del dispositivo", error });
  }
};

// Eliminar un registro de datos del dispositivo
exports.delete = async (req, res) => {
  try {
    const deleted = await DeviceData.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Datos del dispositivo no encontrados" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar los datos del dispositivo", error });
  }
};
