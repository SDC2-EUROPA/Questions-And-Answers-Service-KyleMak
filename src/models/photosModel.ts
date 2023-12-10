import sequelize from '../db';
import { Answer } from './answersModel';

const { DataTypes } = require('sequelize');

// eslint-disable-next-line @typescript-eslint/indent, import/prefer-default-export
 export const AnswerPhotos = sequelize.define('AnswerPhotos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  answer_id: {
    type: DataTypes.INTEGER,
    references: { model: 'answers', key: 'id' },
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'answers_photos',
  createdAt: false,
  updatedAt: false,
});

Answer.hasMany(AnswerPhotos, {
  foreignKey: 'answer_id',
  as: 'AnswerPhotos',
});
AnswerPhotos.belongsTo(Answer, {
  foreignKey: 'answer_id',
});
