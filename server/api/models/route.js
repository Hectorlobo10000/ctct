module.exports = (sequelize, Sequelize) => {
  return sequelize.define('route', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false
    }/* ,
    companyId: {
      type: Sequelize.UUID,
      allowNull: false
    } */
  },
  {
    sequelize,
    tableName: 'routes',
    timestamps: true,
    paranoid: true
  })
}