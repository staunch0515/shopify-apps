"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Log = sequelize.define("Log", {
    ...sequelize.mustFields,
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      comment: ''
    },
    url: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
    ip: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
    area: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
    lang: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
    timezone: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
    inputData: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: ''
    },
    outputData: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: ''
    },
    states: {
      type: DataTypes.ENUM,
      values: ['Success', 'Failure', 'Timeout'],
    }
  }, {
    tableName: 't_log',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['userId']
      },
    ]
  }
  );


  // Adding a class level method
  Log.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  Log.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return Log;
};
