const { Client } = require('ts-postgres')
require('dotenv').config();

const connectDB = async () => {
  try {
    const client = new Client({
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_DATABASE,
      password: process.env.DB_PASS,
    });
    await client.connect();
    const res = await client.query('SELECT cont(*) FROM questions');
    console.log('this is the result from db.ts:', res);
    await client.end();
  } catch (error) {
    console.log(error);
  }
};

connectDB();
