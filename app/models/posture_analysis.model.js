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
        model: 'users', // nombre tabla users
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    },
    current_posture: {
      type: Sequelize.STRING(100),  // Puedes ajustar el tamaño si quieres
      allowNull: false
    },
    body_part: {
      type: Sequelize.STRING(100),
      allowNull: false
    },
    status: {
      type: Sequelize.ENUM('Completado', 'En progreso'),
      allowNull: false
    }
  }, {
    timestamps: true, // Para que Sequelize maneje createdAt y updatedAt automáticamente
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  PostureAnalysis.associate = (models) => {
    PostureAnalysis.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return PostureAnalysis;
};
