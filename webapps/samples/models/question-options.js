"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var QuestionOption = sequelize.define("QuestionOption", {
    ...sequelize.mustFields,
    questionUid: {
      allowNull: false,
      type: DataTypes.UUID,
      comment: ''
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
  }, {
    tableName: 't_question_option',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['questionUid']
      },
    ]
  }
  );


  // Adding a class level method
  QuestionOption.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  QuestionOption.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return QuestionOption;
};
