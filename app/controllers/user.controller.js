// controllers/user.controller.js
const db = require('../config/db.config.js');
const User = db.User;

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta_aqui';

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const payload = {
      id: user.id,
      email: user.email
    };

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};
// Crear un nuevo usuario
exports.create = async (req, res) => {
  try {
    const user = await User.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      date_of_birth: req.body.date_of_birth,
      phone_number: req.body.phone_number
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el usuario", error });
  }
};

// Obtener todos los usuarios
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios", error });
  }
};

// Obtener un usuario por ID
exports.findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el usuario", error });
  }
};

// Actualizar un usuario
exports.update = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, { where: { id: req.params.id } });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el usuario", error });
  }
};

// Eliminar un usuario
exports.delete = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};
