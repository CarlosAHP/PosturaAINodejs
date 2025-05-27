module.exports = (sequelize, DataTypes) => {
  const PostureCause = sequelize.define('PostureCause', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    posture_correction_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'posture_corrections', // nombre exacto de la tabla relacionada
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    possible_cause: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    tableName: 'posture_causes',
    timestamps: false
  });

  PostureCause.associate = (models) => {
    PostureCause.belongsTo(models.PostureCorrection, {
      foreignKey: 'posture_correction_id',
      as: 'correction'
    });
  };

  return PostureCause;
};
