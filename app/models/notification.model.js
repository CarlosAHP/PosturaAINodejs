// models/notification.model.js
module.exports = (sequelize, Sequelize) => {
    const Notification = sequelize.define('notification', {
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
        onDelete: 'CASCADE', // Elimina la notificación si el usuario es eliminado
        allowNull: false
      },
      message: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      type: {
        type: Sequelize.STRING(50),
        allowNull: false,
        validate: {
          isIn: [['Recordatorio', 'Resultado de análisis']]
        }
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      read: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    });
  
    // Definir la relación con el modelo User
    Notification.associate = (models) => {
      Notification.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };
  
    return Notification;
  };
  