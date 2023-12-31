import express, { Router, Request, Response } from 'express';
import { AnswersModel, QuestionsModel } from '../types/types';

require('dotenv').config();

const {
  getQuestions, updateQuestionHelpful, reportQuestion, addQuestion,
} = require('../logic/questionsLogic');
const {
  getAnswers, updateAnswerHelpful, reportAnswer, addAnswer,
} = require('../logic/answersLogic');

const qaRouter:Router = express.Router();

qaRouter.get(`/${process.env.LOADER}`, (req:Request, res:Response) => {
  res.status(200).send(process.env.LOADER);
});

qaRouter.get('/questions', (req:Request, res:Response) => {
  if (!req.query.product_id) {
    res.status(400).send('Missing product_id');
  }
  //for loader.io testing, change back for development
  const randomId = () => 900000 + Math.floor((Math.random() * 100000));
  const Id = randomId();
  getQuestions(Id)
    .then((results:QuestionsModel[]) => {
      res.status(200).send(results);
    })
    .catch((err: any) => {
      console.log(err);
      res.sendStatus(404);
    });
});

qaRouter.put('/questions/:question_id/helpful', (req:Request, res:Response) => {
  const id = req.params.question_id;
  updateQuestionHelpful(id)
    .then(() => res.status(204).send())
    .catch(() => res.sendStatus(400));
});

qaRouter.put('/questions/:question_id/report', (req:Request, res:Response) => {
  const id = req.params.question_id;
  reportQuestion(id)
    .then(() => res.status(204).send())
    .catch(() => res.sendStatus(400));
});

qaRouter.post('/questions', (req:Request, res:Response) => {
  const {
    body, name, email, productId,
  } = req.body;
  addQuestion({
    productId,
    body,
    name,
    email,
  })
    .then(() => res.status(201).send())
    .catch((e:any) => res.status(400).send({ error: e.message }));
});

qaRouter.get('/questions/:question_id/answers', (req:Request, res:Response) => {
  //req.params.question_id
  const randomId = () => 900000 + Math.floor((Math.random() * 100000));
  const Id = randomId();
  getAnswers(Id)
    .then((results:AnswersModel[]) => {
      res.status(200).send(results);
    })
    .catch((err: any) => {
      console.log(err);
      res.sendStatus(404);
    });
});

qaRouter.put('/answers/:answer_id/helpful', (req:Request, res:Response) => {
  const id = req.params.answer_id;
  updateAnswerHelpful(id)
    .then(() => res.status(204).send())
    .catch(() => res.sendStatus(400));
});

qaRouter.put('/answers/:answer_id/report', (req:Request, res:Response) => {
  const id = req.params.answer_id;
  reportAnswer(id)
    .then(() => res.status(204).send())
    .catch(() => res.sendStatus(400));
});

qaRouter.post('/questions/:question_id/answers', (req:Request, res:Response) => {
  const {
    body, name, email, photos,
  } = req.body;
  const questionId = req.params.question_id;
  addAnswer(body, name, email, photos, questionId)
    .then(() => res.status(201).send())
    .catch(() => res.sendStatus(400));
});

export default qaRouter;
