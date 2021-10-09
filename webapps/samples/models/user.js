"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("User", {
    ...sequelize.mustFields,
    userType: {
      type: DataTypes.ENUM,
      values: ['customer', 'shop'],
      comment: ''
    },
    userId: {
      allowNull: true,
      unique: true,
      type: DataTypes.INTEGER,
      comment: 'id of shopify'
    },
    email: {
      allowNull: true,
      type: DataTypes.UUID,
      comment: ''
    },
    lastName: {
      allowNull: true,
      type: DataTypes.UUID,
      comment: ''
    },
    firstName: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: ''
    },
    states: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted'],
    }
  }, {
    tableName: 't_user',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['userType']
      },
      {
        fields: ['userId']
      },
    ]
  });


  // Adding a class level method
  User.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  User.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return User;
};
