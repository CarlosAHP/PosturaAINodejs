// models/user_exercise_log.model.js
module.exports = (sequelize, Sequelize) => {
    const UserExerciseLog = sequelize.define('user_exercise_log', {
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
      exercise_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'posture_exercises', // Nombre de la tabla "posture_exercises"
          key: 'id'
        },
        onDelete: 'CASCADE', // Elimina el registro si el ejercicio postural es eliminado
        allowNull: false
      },
      date: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      duration_minutes: {
        type: Sequelize.INTEGER
      },
      completed: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      }
    });
  
    // Definir la relación con los modelos User y PostureExercise
    UserExerciseLog.associate = (models) => {
      UserExerciseLog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
      UserExerciseLog.belongsTo(models.PostureExercise, { foreignKey: 'exercise_id', as: 'posture_exercise' });
    };
  
    return UserExerciseLog;
  };
  