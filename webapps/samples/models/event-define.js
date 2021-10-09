"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var EventDefine = sequelize.define("EventDefine", {
    ...sequelize.mustFields,
    type: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: 'id from shopify'
    },
    states: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted'],
    }
  }, {
    tableName: 't_event_define',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['type']
      },
    ]
  }
  );


  // Adding a class level method
  EventDefine.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  EventDefine.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return EventDefine;
};
