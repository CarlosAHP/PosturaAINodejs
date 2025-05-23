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
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    name: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    posture: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    duration_minutes: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  });

  PostureCorrection.associate = (models) => {
    PostureCorrection.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return PostureCorrection;
};
