module.exports = (sequelize, Sequelize) => {
  return sequelize.define('company', {
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
    address: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    tableName: 'companies',
    timestamps: true,
    paranoid: true
  })
}