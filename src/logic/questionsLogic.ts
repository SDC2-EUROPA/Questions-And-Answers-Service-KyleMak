const { Question } = require('../models/questionsModel');

import { QuestionsModel } from '../types/types';

const getQuestions = async (productId:number):Promise<QuestionsModel[]> => { //need to add logic regarding reported questions
  const questionsArray = await Question.findAll({
    where: {
      product_id: productId,
    },
  });
  return questionsArray;
};

const updateQuestionHelpful = async (questionId:number):Promise<QuestionsModel[]> => {
  const updatedQuestion = await Question.increment('helpful', {
    where: {
      id: questionId,
    },
  });
  return updatedQuestion;
};

const reportQuestion = async (questionId:number):Promise<QuestionsModel[]> => {
  const updateReport = await Question.update({ reported: true }, {
    where: {
      id: questionId,
    },
  });
  return updateReport;
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
    throw new Error((error as any).message);
  }
};

module.exports = {
  getQuestions, updateQuestionHelpful, reportQuestion, addQuestion,
};
