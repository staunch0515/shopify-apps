"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Examine = sequelize.define("Examine", {
    ...sequelize.mustFields,
    productId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      comment: 'id of shopify'
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
      comment: '调查可以开始的时间'
    },
    endDate: {
      allowNull: true,
      type: DataTypes.DATE,
      comment: '调查关闭的时间'
    },
  }, {
    tableName: 't_examine',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['productId']
      },
      {
        fields: ['startDate']
      },
    ]
  }
  );


  // Adding a class level method
  Examine.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  Examine.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return Examine;
};
