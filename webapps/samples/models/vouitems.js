"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var VoucherItems = sequelize.define("VoucherItems", {
    ...sequelize.mustFields,
    voucherUid: {
      type: DataTypes.UUID,
      comment: ''
    },
    ledgerUid: {
      allowNull: true,
      type: DataTypes.UUID,
      comment: 'id from shopify'
    },
    digest: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: 'This is a column name that has a comment'
    },
    amount: {
      allowNull: true,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
      comment: 'id from shopify'
    },
    formula: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: 'id from shopify'
    },
  }, {
    tableName: 't_voucher_item',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['voucherUid']
      },
      {
        fields: ['ledgerUid']
      },
    ]
  });


  // Adding a class level method
  VoucherItems.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  VoucherItems.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return VoucherItems;
};
