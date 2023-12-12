import { describe } from 'node:test';
import axios from 'axios';
import { AnswersModel, QuestionsModel } from '../types/types';
// import qaRouter from '../controllers/qaController';

const getQuestionsEndpoint = 'http://localhost:3000/qa/questions?product_id=1';
const updateHelpfulQuestionEndpoint = 'http://localhost:3000/qa/questions/1/helpful';
const updateReportedQuestionEndpoint = 'http://localhost:3000/qa/questions/1/report';
const getAnswersEndpoint = 'http://localhost:3000/qa/questions/1/answers';
const updateHelpfulAnswerEndpoint = 'http://localhost:3000/qa/answers/1/helpful';
const updateReportedAnswerEndpoint = 'http://localhost:3000/qa/answers/1/report';

describe('GET questions', () => {
  it('Responds with a status code of 200', async () => {
    const res = await axios.get(getQuestionsEndpoint);
    expect(res.status).toBe(200);
  });

  it('Should have the correct fields', async () => {
    const res = await axios.get(getQuestionsEndpoint);
    res.data.forEach((question:QuestionsModel) => {
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('product_id');
      expect(question).toHaveProperty('body');
      expect(question).toHaveProperty('date_written');
      expect(question).toHaveProperty('asker_name');
      expect(question).toHaveProperty('asker_email');
      expect(question).toHaveProperty('reported');
      expect(question).toHaveProperty('helpful');
    });
  });
});

describe('PUT questions', () => {
  describe('helpful endpoint', () => {
    it('Responds with a status code of 204', async () => {
      const helpfulRes = await axios.put(updateHelpfulQuestionEndpoint);
      expect(helpfulRes.status).toBe(204);
    });
  });
  describe('reported endpoint', () => {
    it('Responds with a status code of 204', async () => {
      const reportedRes = await axios.put(updateReportedQuestionEndpoint);
      expect(reportedRes.status).toBe(204);
    });
  });
});

describe('GET answers', () => {
  it('Responds with a status code of 200', async () => {
    const res = await axios.get(getAnswersEndpoint);
    expect(res.status).toBe(200);
  });

  it('Should have the correct fields', async () => {
    const res = await axios.get(getAnswersEndpoint);
    res.data.forEach((question:AnswersModel) => {
      expect(question).toHaveProperty('id');
      expect(question).toHaveProperty('question_id');
      expect(question).toHaveProperty('body');
      expect(question).toHaveProperty('date_written');
      expect(question).toHaveProperty('answerer_name');
      expect(question).toHaveProperty('answerer_email');
      expect(question).toHaveProperty('reported');
      expect(question).toHaveProperty('helpful');
    });
  });
});

describe('PUT answers', () => {
  describe('helpful endpoint', () => {
    it('Responds with a status code of 204', async () => {
      const helpfulRes = await axios.put(updateHelpfulAnswerEndpoint);
      expect(helpfulRes.status).toBe(204);
    });
  });
  describe('reported endpoint', () => {
    it('Responds with a status code of 204', async () => {
      const reportedRes = await axios.put(updateReportedAnswerEndpoint);
      expect(reportedRes.status).toBe(204);
    });
  });
});