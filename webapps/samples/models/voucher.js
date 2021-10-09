"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Voucher = sequelize.define("Voucher", {
    ...sequelize.mustFields,
    eventUid: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    states: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted'],
    }
  },
    {
      tableName: 't_voucher',
      comment: "I'm a table comment!",
    });

  Voucher.associate = db => {
    Voucher.event = Voucher.belongsTo(db.Event, {
      as: 'event',
      foreignKey: "eventUid"
    });
  };
  // Adding a class level method
  Voucher.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  Voucher.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return Voucher;
};
