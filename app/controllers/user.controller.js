// controllers/user.controller.js
const db = require('../config/db.config.js');
const User = db.User;

const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.JWT_SECRET || 'tu_clave_secreta_aqui';

// --- LOGIN ---
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      return res.status(401).json({ message: 'Email o contraseña incorrectos' });
    }

    const payload = { id: user.id, email: user.email };
    const token   = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// --- CREATE ---
exports.create = async (req, res) => {
  try {
    // Desestructuramos TODO lo que viene en el cuerpo
    const {
      email,
      password,
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      blood_type,
      allergies,
      medical_conditions,
      medications,
      surgeries,
      url_imagen
    } = req.body;

    const user = await User.create({
      email,
      password,
      first_name,
      last_name,
      date_of_birth,
      phone_number,
      blood_type,
      allergies,
      medical_conditions,
      medications,
      surgeries,
      url_imagen
    });

    res.status(201).json(user);
  } catch (error) {
    console.error('Error al crear el usuario:', error);
    res.status(500).json({ message: 'Error al crear el usuario', error });
  }
};

// --- FIND ALL ---
exports.findAll = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ message: 'Error al obtener los usuarios', error });
  }
};

// --- FIND ONE ---
exports.findOne = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al obtener el usuario:', error);
    res.status(500).json({ message: 'Error al obtener el usuario', error });
  }
};

// --- UPDATE ---
// controllers/user.controller.js

// controllers/user.controller.js
exports.update = async (req, res) => {
  try {
    // 1) Carga el usuario existente
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    // 2) Lista blanca de campos que permitimos actualizar
    const campos = [
      'email',
      'password',
      'first_name',
      'last_name',
      'date_of_birth',
      'phone_number',
      'blood_type',
      'allergies',
      'medical_conditions',
      'medications',
      'surgeries',
      'url_imagen'
    ];

    // 3) Asigna sólo los que vengan definidos
    campos.forEach(c => {
      if (req.body[c] !== undefined) {
        user[c] = req.body[c];
      }
    });

    // 4) Guarda los cambios en la base de datos
    await user.save();

    // 5) Devuelve el objeto actualizado
    return res.status(200).json(user);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ message: 'Error en el servidor', error });
  }
};



// --- DELETE ---
exports.delete = async (req, res) => {
  try {
    const deleted = await User.destroy({ where: { id: req.params.id } });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ message: 'Error al eliminar el usuario', error });
  }
};

  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el usuario", error });
  }
};
