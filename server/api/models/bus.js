module.exports = (sequelize, Sequelize) => {
  return sequelize.define('bus', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      primaryKey: true
    },
    plate: {
      type: Sequelize.STRING(7),
      allowNull: false
    },
    driver: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isAvailable: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'buses',
    timestamps: true,
    paranoid: true
  })
}