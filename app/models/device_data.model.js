// models/device_data.model.js
module.exports = (sequelize, Sequelize) => {
    const DeviceData = sequelize.define('device_data', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'users', // Nombre de la tabla "users"
          key: 'id'
        },
        onDelete: 'CASCADE', // Elimina el registro si el usuario es eliminado
        allowNull: false
      },
      device_type: {
        type: Sequelize.STRING(50),
        allowNull: false
      },
      posture_data: {
        type: Sequelize.JSONB,  // Datos en formato JSON
        allowNull: true
      },
      timestamp: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  
    // Definir la relación con el modelo User
    DeviceData.associate = (models) => {
      DeviceData.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };
  
    return DeviceData;
  };
  