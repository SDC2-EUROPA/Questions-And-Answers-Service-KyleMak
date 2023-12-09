import { Sequelize } from 'sequelize';

require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_URL as string);

const db = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync();
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to connect to database:', error);
  }
};

db();

export default sequelize;
