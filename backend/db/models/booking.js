'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {foreignKey: 'userId'}),
      Booking.belongsTo(models.Spot, {foreignKey: 'spotId'})
    }
  }
  Booking.init({
    spotId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Spots', key: 'id'
      },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      // references: {
      //   model: 'Users', key: 'id'
      },

    startDate: {
      type: DataTypes.DATE,
      allowNull: false
      // need validations (starts after "current time" and must end after start time)
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
      // need validations (starts after "current time" and must end after start time)

    }
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
