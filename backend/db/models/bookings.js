'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Bookings.init({
    id: DataTypes.INTEGER,
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: DataTypes.INTEGER,
    endDate: DataTypes.INTEGER,
    createAt: DataTypes.DATE,
    updateAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};