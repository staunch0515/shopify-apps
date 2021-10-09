"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var VoucherDefine = sequelize.define("VoucherDefine", {
    ...sequelize.mustFields,
    voucherType: {
      type: DataTypes.ENUM,
      values: ['customer', 'shop'],
      comment: ''
    },
    userId: {
      allowNull: true,
      type: DataTypes.INTEGER,
      comment: 'id from shopify'
    },
    states: {
      type: DataTypes.ENUM,
      values: ['active', 'pending', 'deleted'],
    }
  }, {
    tableName: 't_voucher_define',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['userId']
      },
    ]
  });


  // Adding a class level method
  VoucherDefine.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  VoucherDefine.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return VoucherDefine;
};
