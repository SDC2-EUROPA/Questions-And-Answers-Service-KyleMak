// eslint-disable-next-line import/no-import-module-exports
import { AnswersModel } from '../types/types';
// import { Answer } from '../models/answersModel';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// import { AnswerPhotos } from '../models/photosModel';

const { Answer } = require('../models/answersModel');
const { AnswerPhotos } = require('../models/photosModel');

const getAnswers = async (questionId:number):
Promise<AnswersModel[]> => {
  try {
    const answersArray = await Answer.findAll({
      where: {
        question_id: questionId,
      },
    });
    return answersArray;
  } catch (error) {
    throw new Error(`Error gettings answers from questionId ${questionId}:, ${(error as any).message}`);
  }
};

const updateAnswerHelpful = async (answerId:number):
Promise<AnswersModel[]> => {
  try {
    const updatedAnswer = await Answer.increment('helpful', {
      where: {
        id: answerId,
      },
    });
    return updatedAnswer;
  } catch (error) {
    throw new Error(`Error updating helpful for answerId ${answerId}:, ${(error as any).message}`);
  }
};

const reportAnswer = async (answerId:number):
Promise<AnswersModel[]> => {
  try {
    const updatedAnswer = await Answer.update({ reported: true }, {
      where: {
        id: answerId,
      },
    });
    return updatedAnswer;
  } catch (error) {
    throw new Error(`Error updating reported for answerId ${answerId}:, ${(error as any).message}`);
  }
};

const addAnswer = async (body:string, name:string, email:string, photos:string[], questionId:number)
:Promise<AnswersModel[] | undefined> => {
  const photoStored = photos?.length ? photos.map(
    (photoString) => ({ url: photoString }),
  ) : undefined;
  try {
    const addedAnswer = await Answer.create({
      question_id: questionId,
      body,
      date_written: new Date(),
      answerer_name: name,
      answerer_email: email,
      reported: false,
      helpful: 0,
      AnswerPhotos: photoStored,
    }, {
      include: photoStored ? ['AnswerPhotos'] : undefined,
    });
    return addedAnswer;
  } catch (error) {
    throw new Error(`Error adding answer at questionId ${questionId}:, ${(error as any).message}`);
  }
};

export {
  getAnswers, updateAnswerHelpful, reportAnswer, addAnswer,
};
