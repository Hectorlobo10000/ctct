module.exports = (sequelize, Sequelize) => {
  return sequelize.define('reservation', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    token: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false
    },
    prepaid: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    isActive: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    reserved: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    dateOut: {
      type: Sequelize.DATEONLY,
      allowNull: false
    }
  },
  {
    sequelize,
    sequelize,
    tableName: 'reservations',
    timestamps: true,
    paranoid: true
  })
}