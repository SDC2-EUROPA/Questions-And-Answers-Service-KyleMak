import http from 'k6/http';
import { check, sleep } from 'k6';

// eslint-disable-next-line import/prefer-default-export
export const options = {
  thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<2000'], // 95% of requests should be below 2000ms
  },
  stages: [
    { duration: '10s', target: 500 },
    { duration: '20s', target: 500 },
    { duration: '5s', target: 0 },
  ],
};

const randomId = () => 900000 + Math.floor((Math.random() * 100000));

export default () => {
  const Id = randomId();
  const urls = [
    `http://localhost:3000/qa/questions?product_id=${Id}`,
    `http://localhost:3000/qa/questions/${Id}/answers`,
  ];

  sleep(1);
  const questionRes = http.get(urls[0], {
    tags: { name: 'RandomQuestions' },
  });
  const answerRes = http.get(urls[1], {
    tags: { name: 'RandomAnswers' },
  });

  check(questionRes, {
    'question response code was 200': (response) => response.status === 200,
  });
  check(answerRes, {
    'answer response code was 200': (response) => response.status === 200,
  });
};
