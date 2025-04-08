// models/posture_correction.model.js
module.exports = (sequelize, Sequelize) => {
    const PostureCorrection = sequelize.define('posture_correction', {
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
        onDelete: 'CASCADE', // Elimina las correcciones si el usuario es eliminado
        allowNull: false
      },
      posture_analysis_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'posture_analyses', // Nombre de la tabla "posture_analyses"
          key: 'id'
        },
        onDelete: 'CASCADE', // Elimina las correcciones si el análisis es eliminado
        allowNull: false
      },
      suggested_correction: {
        type: Sequelize.TEXT
      },
      duration_minutes: {
        type: Sequelize.INTEGER
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      }
    });
  
    // Definir la relación con los modelos User y PostureAnalysis
    PostureCorrection.associate = (models) => {
      PostureCorrection.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      PostureCorrection.belongsTo(models.PostureAnalysis, { foreignKey: 'posture_analysis_id', as: 'posture_analysis' });
    };
  
    return PostureCorrection;
  };
  