"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var Question = sequelize.define("Question", {
    ...sequelize.mustFields,
    examineUid: {
      allowNull: false,
      type: DataTypes.UUID,
      comment: ''
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING,
      comment: ''
    },
    answerKey: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: ''
    },
  }, {
    tableName: 't_question',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['examineUid']
      },
    ]
  }
  );


  // Adding a class level method
  Question.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  Question.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return Question;
};
