'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reviews.hasMany(models.ReviewImages, {foreignKey: 'reviewId'}),
      Reviews.belongsTo(models.Users, {foreignKey: 'userId'}),
      Reviews.belongsTo(models.Spots, {foreignKey: 'spotId'})
    }
  }
  Reviews.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: DataTypes.STRING,
    stars: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reviews',
  });
  return Reviews;
};
