"use strict";
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
  var AnswerDetail = sequelize.define("AnswerDetail", {
    ...sequelize.mustFields,
    answerId: {
      allowNull: false,
      type: DataTypes.UUID,
      comment: '关联的答卷UID'
    },
    answerOptionUid: {
      allowNull: true,
      type: DataTypes.UUID,
      comment: '所答的选项'
    },
    result: {
      allowNull: true,
      type: DataTypes.STRING,
      comment: '本题的所答的内容'
    },
    score: {
      allowNull: true,
      type: DataTypes.INTEGER,
      defaultValue: 0,
      comment: '本题的的得分'
    },
    assert: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      comment: '答题的结果对错'
    },
  }, {
    tableName: 't_answer_detail',
    comment: "I'm a table comment!",
    indexes: [
      {
        fields: ['answerId']
      },
      {
        fields: ['answerOptionUid']
      },
    ]
  }
  );


  // Adding a class level method
  AnswerDetail.classLevelMethod = function () {
    return 'foo';
  };

  // Adding an instance level method
  AnswerDetail.prototype.instanceLevelMethod = function () {
    return 'bar';
  };

  return AnswerDetail;
};
