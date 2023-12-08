import {
  CreationOptional, InferAttributes, InferCreationAttributes, Model,
} from 'sequelize';

export interface QuestionsModel extends Model<InferAttributes<QuestionsModel >,
InferCreationAttributes<QuestionsModel >> {

  id: CreationOptional<number>;
  product_id: number;
  body:string;
  date_written: Date;
  asker_name: string;
  asker_email:string;
  reported: boolean;
  helpful: number;
}

export interface AnswersModel extends Model<InferAttributes<AnswersModel >,
InferCreationAttributes<AnswersModel >> {

  id: CreationOptional<number>;
  question_id: number;
  body:string;
  date_written: Date;
  answerer_name: string;
  answerer_email:string;
  reported: boolean;
  helpful: number;
}
