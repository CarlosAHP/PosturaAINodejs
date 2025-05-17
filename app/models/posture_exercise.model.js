// models/posture_exercise.model.js
module.exports = (sequelize, Sequelize) => {
    const PostureExercise = sequelize.define('posture_exercise', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT
      },
      duration_minutes: {
        type: Sequelize.INTEGER
      },
      difficulty_level: {
        type: Sequelize.ENUM('Fácil', 'Intermedio', 'Avanzado'),
        allowNull: false
      }
    });
  
    return PostureExercise;
  };
  