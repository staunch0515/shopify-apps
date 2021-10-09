"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var AccountDetail = sequelize.define("AccountDetail", {
    ...sequelize.mustFields,
    voucherUid: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    accountUid: {
      allowNull: false,
      type: DataTypes.UUID,
    },
    input: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    output: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
    balance: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0,
    },
  }, {
    tableName: 't_account_detail',
    indexes: [
      {
        fields: ['accountUid']
      },
      {
        fields: ['voucherUid']
      },
    ]
  });

  AccountDetail.associate = db => {
    AccountDetail.account = AccountDetail.belongsTo(db.Account, {
      as: 'account',
      foreignKey: "accountUid"
    });

    AccountDetail.voucher = AccountDetail.belongsTo(db.Voucher, {
      as: 'voucher',
      foreignKey: "voucherUid"
    });
  };
  
  // Adding a class level method
  AccountDetail.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  AccountDetail.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return AccountDetail;
};
