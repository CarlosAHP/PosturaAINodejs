// models/posture_analysis.model.js
module.exports = (sequelize, Sequelize) => {
    const PostureAnalysis = sequelize.define('posture_analysis', {
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
        onDelete: 'CASCADE', // Elimina los análisis si el usuario es eliminado
        allowNull: false
      },
      posture_score: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      status: {
        type: Sequelize.ENUM('Completado', 'En progreso'),
        allowNull: false
      }
    });
  
    // Definir la relación con el modelo User
    PostureAnalysis.associate = (models) => {
      PostureAnalysis.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
    };
  
    return PostureAnalysis;
  };
  