"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Event = sequelize.define("Event", {
    ...sequelize.mustFields,
    eventDefUid: {
      allowNull: false,
      type: DataTypes.UUID,
      comment: 'id from shopify'
    },
    userId: {
      allowNull: true,
      unique: true,
      type: DataTypes.INTEGER,
      comment: 'id of shopify'
    },
  }, {
    tableName: 't_event',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['eventDefUid']
      },
      {
        fields: ['userId']
      },
    ]
  }
  );


  // Adding a class level method
  Event.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  Event.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return Event;
};
