"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var EventRule = sequelize.define("EventRule", {
    ...sequelize.mustFields,
    eventDefUid: {
      allowNull: true,
      type: DataTypes.UUID,
      comment: 'id from shopify'
    },
    ruleType: {
      allowNull: true,
      type: DataTypes.UUID,
      comment: 'id from shopify'
    },
  }, {
    tableName: 't_event_rule',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['eventDefUid']
      },
      {
        fields: ['ruleType']
      },
    ]
  }
  );


  // Adding a class level method
  EventRule.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  EventRule.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return EventRule;
};
