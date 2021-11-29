const pool = require('../server/connection.js');

const prepareSchema = () => {
  // assuming created this db in the shell
  var initSchema = `
  USE ratings_and_reviews;

  CREATE TABLE IF NOT EXISTS reviews (
    id INT AUTO_INCREMENT NOT NULL,
    product_id INT NOT NULL,
    rating TINYINT NOT NULL,
    summary VARCHAR(60) DEFAULT NULL,
    recommend VARCHAR(5) NOT NULL,
    response VARCHAR(1000) DEFAULT NULL,
    body VARCHAR(1000) NOT NULL,
    date BIGINT NOT NULL,
    reviewer_name VARCHAR(60) NOT NULL,
    helpfulness INT DEFAULT 0,
    reported VARCHAR(5) DEFAULT 'false',
    reviewer_email VARCHAR(60) NOT NULL,
    not_helpfulness INT DEFAULT 0,
    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS photos (
    id INT AUTO_INCREMENT NOT NULL,
    review_id INT NOT NULL,
    url VARCHAR(2048) NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (review_id)
      REFERENCES reviews(id)
  );

  CREATE TABLE IF NOT EXISTS characteristics (
    id INT AUTO_INCREMENT NOT NULL,
    product_id INT NOT NULL,
    name VARCHAR(20) NOT NULL,

    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXISTS characteristic_reviews (
    id INT AUTO_INCREMENT NOT NULL,
    characteristic_id INT NOT NULL,
    review_id INT NOT NULL,
    value TINYINT NOT NULL,

    PRIMARY KEY (id),
    FOREIGN KEY (characteristic_id)
      REFERENCES characteristics(id),
    FOREIGN KEY (review_id)
      REFERENCES reviews(id)
  );`;

    pool.query(initSchema)
      .then(() => {
        console.log('Schema loaded!');
      })
      .catch((err) => {
        console.log('Schema error');
        throw err;
      });

};

prepareSchema();