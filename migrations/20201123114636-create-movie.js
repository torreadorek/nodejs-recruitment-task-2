'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Movies', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      imdbId:{
        type:Sequelize.STRING,
        allowNull:false,
        require:true
      },
      title: {
        type:Sequelize.STRING,
        allowNull:false,
        require:true
      },
      year: {
        type:Sequelize.STRING,
        allowNull:false,
        require:true
      },
      released:  {
        type:Sequelize.STRING,
        allowNull:false,
        require:true
      },
      director:  {
        type:Sequelize.STRING,
        allowNull:false,
        require:true
      },
      actors:{
          type:Sequelize.STRING,
          allowNull:false,
          require:true
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Movies');
  }
};