// import { Answer } from '../models/answersModel';
// const AnswersModel = require('../types/types');
const { Answer } = require('../models/answersModel');

import { AnswerPhotos } from '../models/photosModel';
import { AnswersModel } from '../types/types';

const getAnswers = async (questionId:number):
Promise<AnswersModel[]> => {//need to add logic regarding reported answers
  const answersArray = await Answer.findAll({
    where: {
      question_id: questionId,
    },
  });
  return answersArray;
};

const updateAnswerHelpful = async (answerId:number):
Promise<AnswersModel[]> => {
  const updatedAnswer = await Answer.increment('helpful', {
    where: {
      id: answerId,
    },
  });
  return updatedAnswer;
};

const reportAnswer = async (answerId:number):
Promise<AnswersModel[]> => {
  const updatedAnswer = await Answer.update({ reported: true }, {
    where: {
      id: answerId,
    },
  });
  return updatedAnswer;
};

const addAnswer = async (body:string, name:string, email:string, photo:any, questionId:number) :
Promise<AnswersModel[]> => {
  const addedAnswer = await Answer.create({
    question_id: questionId,
    body,
    date_written: new Date(),
    answerer_name: name,
    answerer_email: email,
    reported: false,
    helpful: 0,
  }, {
    include: ['AnswersPhoto'],
  });

  if (photo && photo.length > 0) {
    const addedPhoto = await AnswerPhotos.update({ url: photo }, {
      where: {
        answer_id: 1,
      },
    });
  }
  return addedAnswer;
};

module.exports = {
  getAnswers, updateAnswerHelpful, reportAnswer, addAnswer,
};
