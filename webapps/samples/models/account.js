"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Account = sequelize.define("Account", {
    ...sequelize.mustFields,
    name: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    title: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    currency: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    balance: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    states: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'stop'],
    }
  },
    {
      ...sequelize.mustOptions,
      tableName: 't_account',
    });

  // Adding a class level method
  Account.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  Account.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return Account;
};
