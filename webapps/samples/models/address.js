"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define("Address", {
    uid: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    shop: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    customer_id: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    first_name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    company: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    address1: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    address2: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    province: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    zip: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    country: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    province_code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    country_code: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    country_name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      defaultValue: sequelize.literal("nextval('t_address_seq')"),
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      get() {
        moment.locale('ja');
        return moment(this.getDataValue('createdAt')).format('YYYY年M月D日 (ddd) HH時mm分ss秒');
      }
    },
    createdActor: {
      type: DataTypes.STRING,
      defaultValue: "system",
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      get() {
        return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
      }
    },
    updatedActor: {
      type: DataTypes.STRING,
      defaultValue: "system",
    },
    delFlg: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 't_address'
  });

  return Address;
};
