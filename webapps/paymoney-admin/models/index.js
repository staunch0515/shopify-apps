"use strict";

function splitMulti(str, tokens) {
  var tempChar = tokens[0]; // We can use the first token as a temporary join character
  for (var i = 1; i < tokens.length; i++) {
    str = str.split(tokens[i]).join(tempChar);
  }
  str = str.split(tempChar);
  if (Array.isArray(str)) {
    var rel = [];
    str.forEach(span => {
      if (span.length > 0) {
        rel.push(span);
      }
    })
    return rel;
  }
  return str;
}

var splitOrig = String.prototype.split; // Maintain a reference to inbuilt fn
String.prototype.split = function () {
  if (arguments[0].length > 0) {
    if (Object.prototype.toString.call(arguments[0]) == "[object Array]") { // Check if our separator is an array
      return splitMulti(this, arguments[0]);  // Call splitMulti
    }
  }
  return splitOrig.apply(this, arguments); // Call original split maintaining context
};

var fs = require("fs");
var path = require("path");
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/../common/config.js")[env];
var db = {};

var Sequelize = require('sequelize'), sequelize = null;
const { QueryTypes } = require('sequelize');

const DB_URL = process.env.HEROKU_POSTGRESQL_BRONZE_URL;
if (DB_URL) {
  const match = DB_URL.split([':', '@', '/']);
  sequelize = new Sequelize(DB_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false
      },
    },
    logging: false,
  })
} else {
  // the application is executed on the local machine ... use mysql
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

const seqences = [
  't_address_seq',
  't_form_seq',
];

seqences.map(async sequence => {
  const sql = 'CREATE SEQUENCE IF NOT EXISTS ' + sequence;
  await sequelize.query(sql, { type: QueryTypes.RAW });
})

fs.readdirSync(__dirname).filter(file => {
  return (
    file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  );
})
  .forEach(file => {
    var model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
    console.log("loading model ->" + model.name)
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.sync({
  force: false,
  alter: false
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
