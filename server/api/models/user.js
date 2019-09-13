const jwt = require('jsonwebtoken')

module.exports = (sequelize, Sequelize) => {
  return sequelize.define('user', {
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
    mail: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING(1024),
      allowNull: false
    },
    identity: {
      type: Sequelize.STRING(13),
      allowNull:false
    },
    phone: {
      type: Sequelize.STRING(8),
      allowNull: false
    }
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: true,
    paranoid: true,
    indexes: [
      {
        unique: true,
        fields: ['mail']
      }
    ],
    getterMethods: {
      generateToken() {
        return jwt.sign({ id: this.id, mail: this.mail }, 'jwtPrivateKeyCTCT')
      }
    }
  })
}
