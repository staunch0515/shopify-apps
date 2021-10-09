"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Shop = sequelize.define("Shop", {
    ...sequelize.mustFields,
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
  }, {
    tableName: 't_shop',
    comment: "I'm a table comment!",
  });


  // Adding a class level method
  Shop.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  Shop.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return Shop;
};
