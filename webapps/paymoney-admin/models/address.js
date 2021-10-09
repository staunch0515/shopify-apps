"use strict";
const path = require('path');
const uuid = require("uuid/v4");
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Address = sequelize.define("Address", {
    uid: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    domain: {
      field: "f_domain",
      allowNull: false,
      type: DataTypes.STRING,
    },
    customer_id: {
      field: "f_customer_id",
      allowNull: true,
      type: DataTypes.STRING,
    },
    first_name: {
      field: "f_first_name",
      allowNull: true,
      type: DataTypes.STRING,
    },
    last_name: {
      field: "f_last_name",
      allowNull: true,
      type: DataTypes.STRING,
    },
    company: {
      field: "f_company",
      allowNull: true,
      type: DataTypes.STRING,
    },
    address1: {
      field: "f_address1",
      allowNull: true,
      type: DataTypes.STRING,
    },
    address2: {
      field: "f_address2",
      allowNull: true,
      type: DataTypes.STRING,
    },
    city: {
      field: "f_city",
      allowNull: true,
      type: DataTypes.STRING,
    },
    province: {
      field: "f_province",
      allowNull: true,
      type: DataTypes.STRING,
    },
    zip: {
      field: "f_zip",
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone: {
      field: "f_phone",
      allowNull: true,
      type: DataTypes.STRING,
    },
    country: {
      field: "f_country",
      allowNull: true,
      type: DataTypes.STRING,
    },
    name: {
      field: "f_name",
      allowNull: true,
      type: DataTypes.STRING,
    },
    province_code: {
      field: "f_province_code",
      allowNull: true,
      type: DataTypes.STRING,
    },
    country_code: {
      field: "f_country_code",
      allowNull: true,
      type: DataTypes.STRING,
    },
    country_name: {
      field: "f_country_name",
      allowNull: true,
      type: DataTypes.STRING,
    },
    orderNo: {
      field: "lst_ord",
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      defaultValue: sequelize.literal("nextval('t_address_seq')"),
    },
    createdAt: {
      field: "crtd_tm",
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      get() {
        moment.locale('ja');
        return moment(this.getDataValue('createdAt')).format('YYYY年M月D日 (ddd) HH時mm分ss秒');
      }
    },
    createdActor: {
      field: "crtd_oprtr",
      type: DataTypes.STRING,
      defaultValue: "system",
    },
    updatedAt: {
      field: "ltst_upd_tm",
      type: DataTypes.DATE,
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      get() {
        return moment(this.getDataValue('updatedAt')).format('DD/MM/YYYY h:mm:ss');
      }
    },
    updatedActor: {
      field: "ltst_upd_oprtr",
      type: DataTypes.STRING,
      defaultValue: "system",
    },
    delFlg: {
      field: "del_flg",
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    remark: {
      field: "sys_rmk",
      type: DataTypes.STRING,
      allowNull: true
    },
  }, {
    tableName: 't_address'
  });

  Address.beforeCreate(address => address.uid = uuid());

  return Address;
};
