import { DataTypes } from 'sequelize';
import sequelize from '../db';
import { QuestionsModel } from '../types/types';

// const { DataTypes } = require('sequelize');

// eslint-disable-next-line @typescript-eslint/indent, import/prefer-default-export
 export const Question = sequelize.define<QuestionsModel>('Question', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  product_id: {
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
  asker_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  asker_email: {
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
  tableName: 'questions',
  createdAt: false,
  updatedAt: false,
  indexes: [
    {
      name: 'IX_questions_productId',
      using: 'BTREE',
      fields: ['product_id'],
    },
  ],
});
