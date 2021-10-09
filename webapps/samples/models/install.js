"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Install = sequelize.define("Install", {
    ...sequelize.mustFields,
    userId: {
      allowNull: false,
      type: DataTypes.UUID,
      comment: ''
    },
  }, {
    tableName: 't_install',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['userId']
      },
    ]
  }
  );


  // Adding a class level method
  Install.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  Install.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return Install;
};
