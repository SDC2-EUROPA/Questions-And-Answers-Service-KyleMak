import { Question } from '../models/questionsModel';
import { QuestionsModel } from '../types/types';

const getQuestions = async ():Promise<QuestionsModel[]> => {
  const get = await Question.findAll({
    where: {
      product_id: 1,
    },
  });
  const getStringified = JSON.stringify(get);
  const getJson:QuestionsModel[] = JSON.parse(getStringified);
  return getJson;
};
