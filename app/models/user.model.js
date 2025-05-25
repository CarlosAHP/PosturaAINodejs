// models/user.model.js
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING(255),
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(255),
      allowNull: false
    },
    first_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    last_name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    date_of_birth: {
      type: Sequelize.DATE,
      allowNull: true
    },
    phone_number: {
      type: Sequelize.STRING(15),
      allowNull: true
    },
    blood_type: {
      type: Sequelize.STRING(10),
      allowNull: false,
      defaultValue: 'N/A'
    },
    allergies: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'N/A'
    },
    medical_conditions: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'N/A'
    },
    medications: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'N/A'
    },
    surgeries: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: 'N/A'
    },
    url_imagen: {
      type: Sequelize.TEXT,
      allowNull: false,
      defaultValue: ''
    }
    // Quitar created_at y updated_at de la definición manual
  },
  {
    timestamps: true,           // Sequelize manejará createdAt y updatedAt
    createdAt: 'created_at',    // Nombre exacto en la base de datos
    updatedAt: 'updated_at',
    underscored: true           // Convierte camelCase a snake_case
  });

  return User;
};
