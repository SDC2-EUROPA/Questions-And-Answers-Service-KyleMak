import qaController from './controllers/qaController';

const express = require('express');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded());
// const router = require('./controllers/qaController');

app.use('/qa', qaController);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

export default app;
