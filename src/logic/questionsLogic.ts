const { Question } = require('../models/questionsModel');

import { QuestionsModel } from '../types/types';

const getQuestions = async (productId:number):Promise<QuestionsModel[]> => {
  try {
    const questionsArray = await Question.findAll({
      where: {
        product_id: productId,
        reported: false,
      },
    });
    return questionsArray;
  } catch (error) {
    throw new Error('Error getting questions from database');
  }
};

const updateQuestionHelpful = async (questionId:number):Promise<QuestionsModel[]> => {
  try {
    const updatedQuestion = await Question.increment('helpful', {
      where: {
        id: questionId,
      },
    });
    return updatedQuestion;
  } catch (error) {
    throw new Error('Error updating helpful for question');
  }
};

const reportQuestion = async (questionId:number):Promise<QuestionsModel[]> => {
  try {
    const updateReport = await Question.update({ reported: true }, {
      where: {
        id: questionId,
      },
    });
    return updateReport;
  } catch (error) {
    throw new Error(`Error reporting question:, ${(error as any).message}`);
  }
};

const addQuestion = async ({
  productId,
  body,
  name,
  email,
}:{ productId:number, body: string, name: string, email: string }):
Promise<QuestionsModel[]> => {
  try {
    const createdQuestion = await Question.create({
      product_id: productId,
      body,
      date_written: new Date(),
      asker_name: name,
      asker_email: email,
      reported: false,
      helpful: 0,
    });
    return createdQuestion;
  } catch (error) {
    throw new Error(`Error adding question at productId ${productId}:, ${(error as any).message}`);
  }
};

module.exports = {
  getQuestions, updateQuestionHelpful, reportQuestion, addQuestion,
};
