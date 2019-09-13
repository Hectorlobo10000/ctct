module.exports = (sequelize, Sequelize) => {
  return sequelize.define('chair', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    chair: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, 
  {
    sequelize,
    tableName: 'chairs',
    timestamps: true,
    paranoid: true
  })
}