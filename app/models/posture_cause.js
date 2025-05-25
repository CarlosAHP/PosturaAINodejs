module.exports = (sequelize, DataTypes) => {
  const PostureCause = sequelize.define('PostureCause', {
    possible_cause: DataTypes.TEXT
  }, {
    tableName: 'posture_causes',
    timestamps: false
  });

  PostureCause.associate = models => {
    PostureCause.belongsTo(models.PostureCorrection, {
      foreignKey: 'posture_correction_id',
      as: 'correction'
    });
  };

  return PostureCause;
};
