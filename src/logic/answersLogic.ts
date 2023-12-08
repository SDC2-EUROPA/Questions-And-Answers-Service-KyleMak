import { Answer } from '../models/answersModel';
import { AnswersModel } from '../types/types';

const getAnswers = async ():Promise<AnswersModel[]> => {
  const get = await Answer.findAll({
    where: {
      question_id: 1,
    },
  });
  const getStringified = JSON.stringify(get);
  const getJson:AnswersModel[] = JSON.parse(getStringified);
  return getJson;
};
