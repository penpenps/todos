'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    deadline: DataTypes.DATE,
    status: DataTypes.ENUM('Undo', 'Doing', 'Done')
  }, {});
  Task.associate = function(models) {
    models.Task.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });

    models.Task.belongsTo(models.Category, {
      onDelete: "SET NULL",
      foreignKey: {
        allowNull: true 
      }
    });
  };
  return Task;
};