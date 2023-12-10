import sequelize from '../db';
import { Answer } from './answersModel';

const { DataTypes } = require('sequelize');

// eslint-disable-next-line @typescript-eslint/indent, import/prefer-default-export
 export const AnswerPhotos = sequelize.define('Photos', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  answer_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'answers_photos',
  createdAt: false,
  updatedAt: false,
});

Answer.hasMany(AnswerPhotos, {
  foreignKey: 'answer_id',
});
AnswerPhotos.belongsTo(Answer);
