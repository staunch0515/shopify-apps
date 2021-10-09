"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define("AnswerSheet", {
    ...sequelize.mustFields,
    userId: {
      allowNull: true,
      unique: true,
      type: DataTypes.INTEGER,
      comment: 'id of shopify'
    },
    totalScore: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: ''
    },
    assert: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '答题的结果对错'
    },
    eventUId: {
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
        fields: ['userId']
      },
      {
        fields: ['eventUId']
      },
    ]
  }
  );


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
