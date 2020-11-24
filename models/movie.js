'use strict';
const {UUID,UUIDV4} = require('../node_modules/sequelize/lib/data-types')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movie.hasMany(models.Comment)
    }
  };
  Movie.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue:new UUIDV4()
    },
    imdbId:{
      type:DataTypes.STRING,
      allowNull:false,
      require:true
    },
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      require:true
    },
    year: {
      type:DataTypes.STRING,
      allowNull:false,
      require:true
    },
    released:  {
      type:DataTypes.STRING,
      allowNull:false,
      require:true
    },
    director:  {
      type:DataTypes.STRING,
      allowNull:false,
      require:true
    },
    actors:{
        type:DataTypes.STRING,
        allowNull:false,
        require:true
    }
  }, {
    sequelize,
    modelName: 'Movie',
    timestamps:false
  });
  return Movie;
};