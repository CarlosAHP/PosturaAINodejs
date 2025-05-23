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
    posture: {
      type: Sequelize.STRING(100),  // Nuevo campo para indicar la postura asociada
      allowNull: false
    },
    duration_minutes: {
      type: Sequelize.INTEGER
    }
  });

  return PostureExercise;
};
