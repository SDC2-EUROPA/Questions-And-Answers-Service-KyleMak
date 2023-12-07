CREATE TABLE IF NOT EXISTS questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(260) NOT NULL,
  date_written TIMESTAMP NOT NULL,
  asker_name VARCHAR (260) NOT NULL,
  asker_email VARCHAR (260) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0
);

CREATE TEMP TABLE temp_questions (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL,
  body VARCHAR(260) NOT NULL,
  date_written BIGINT NOT NULL,
  asker_name VARCHAR (260) NOT NULL,
  asker_email VARCHAR (260) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0
);

CREATE TEMP TABLE temp_answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(260) NOT NULL,
  date_written BIGINT NOT NULL,
  answerer_name VARCHAR(260) NOT NULL,
  answerer_email VARCHAR(260) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS answers (
  id SERIAL PRIMARY KEY,
  question_id INT NOT NULL,
  body VARCHAR(260) NOT NULL,
  date_written TIMESTAMP NOT NULL,
  answerer_name VARCHAR(260) NOT NULL,
  answerer_email VARCHAR(260) NOT NULL,
  reported BOOLEAN DEFAULT FALSE,
  helpful INT DEFAULT 0,
  FOREIGN KEY (question_id) REFERENCES questions(id)
);

CREATE TABLE IF NOT EXISTS answers_photos (
  id SERIAL PRIMARY KEY,
  answer_id INT NOT NULL,
  url VARCHAR(260),
  FOREIGN KEY (answer_id) REFERENCES answers(id)
);

COPY temp_questions
FROM '/Users/kylemak/HackReactor/SDC-data/questions.csv'
DELIMITER ','
CSV HEADER;

COPY temp_answers
FROM '/Users/kylemak/HackReactor/SDC-data/answers.csv'
DELIMITER ','
CSV HEADER;

INSERT INTO questions (id, product_id, body, date_written, asker_name, asker_email, reported, helpful)
SELECT id, product_id, body, to_timestamp(date_written / 1000), asker_name, asker_email, reported, helpful
FROM temp_questions;

INSERT INTO answers (id, question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
SELECT id, question_id, body, to_timestamp(date_written / 1000), answerer_name, answerer_email, reported, helpful
FROM temp_answers;

DROP TABLE temp_questions;
DROP TABLE temp_answers;

COPY answers_photos
FROM '/Users/kylemak/HackReactor/SDC-data/answers_photos.csv'
DELIMITER ','
CSV HEADER;
