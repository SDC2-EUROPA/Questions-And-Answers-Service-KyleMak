import sequelize from '../db';
import { AnswersModel } from '../types/types';
import { Question } from './questionsModel';

const { DataTypes } = require('sequelize');

// eslint-disable-next-line @typescript-eslint/indent, import/prefer-default-export
 export const Answer = sequelize.define<AnswersModel>('Answer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  body: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  date_written: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  answerer_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  answerer_email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reported: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  helpful: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'answers',
  createdAt: false,
  updatedAt: false,
});

Question.hasMany(Answer, {
  constraints: false,
  foreignKey: 'question_id',
});
Answer.belongsTo(Question, {
  foreignKey: 'question_id',
});
