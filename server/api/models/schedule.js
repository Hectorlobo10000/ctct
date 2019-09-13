module.exports = (sequelize, Sequelize) => {
  return sequelize.define('schedule', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV1,
      allowNull: false,
      primaryKey: true
    },
    hour: {
      type: Sequelize.TIME,
      allowNull: false
    },
    isWeekend: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'schedules',
    timestamps: true,
    paranoid: true
  })
}