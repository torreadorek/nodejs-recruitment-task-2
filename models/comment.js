'use strict';
const {
  Model, UUIDV4
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
     Comment.belongsTo(models.Movie,{foreignKey:'id'})
    }
  };
  Comment.init({
    movieId: {
      type:DataTypes.UUID,
      allowNull:false,
      require:true
    },
    comment:{
      type:DataTypes.STRING,
      allowNull:false,
      require:true
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};