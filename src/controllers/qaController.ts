import { AnswersModel, QuestionsModel } from '../types/types';
import express, { Router, Request, Response } from 'express';
// const { QuestionsModel } = require('../types/types');

const {
  getQuestions, updateQuestionHelpful, reportQuestion, addQuestion,
} = require('../logic/questionsLogic');
const {
  getAnswers, updateAnswerHelpful, reportAnswer, addAnswer,
} = require('../logic/answersLogic');

const qaRouter:Router = express.Router();

qaRouter.get('/questions', (req:Request, res:Response) => {
  if (!req.query.product_id) {
    res.status(400).send('Missing product_id');
  }
  getQuestions(req.query.product_id)
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
  getAnswers(req.params.question_id)
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
  addAnswer(body, name, email, photos)
    .then(() => res.status(201).send())
    .catch(() => res.sendStatus(400));
});

module.exports = qaRouter;
