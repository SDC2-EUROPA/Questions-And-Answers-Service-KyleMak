import { Answer } from '../models/answersModel';
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

const updateAnswerHelpful = async (answerId:number) => {
  const updatedAnswer = await Answer.increment('helpful', {
    where: {
      id: answerId,
    },
  });
  return updatedAnswer;
};

const reportAnswer = async (answerId:number) => {
  const updatedAnswer = await Answer.update({ reported: true }, {
    where: {
      id: answerId,
    },
  });
  return updatedAnswer;
};

const addAnswer = async (body:string, name:string, email:string, photo:any) => { //associate tables
  const addedAnswer = await Answer.create({
    question_id: 1,
    body,
    date_written: new Date(),
    answerer_name: name,
    answerer_email: email,
    reported: false,
    helpful: 0,
  });
  return addedAnswer;
};

module.exports = {
  getAnswers, updateAnswerHelpful, reportAnswer, addAnswer,
};
