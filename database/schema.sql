CREATE DATABASE IF NOT EXISTS ratings_and_reviews;
USE ratings_and_reviews;


CREATE TABLE reviews (
  -- sent with response
  id INT AUTO_INCREMENT NOT NULL,
  product_id INT NOT NULL, -- goes in outer object of response
  rating TINYINT NOT NULL,
  summary VARCHAR(60) DEFAULT NULL,
  recommend BIT NOT NULL, -- boolean type BIT can be 1 (true) or 0 (false)
  response VARCHAR(1000) DEFAULT NULL,
  body VARCHAR(1000) NOT NULL,
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  reviewer_name VARCHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0,

  -- not sent with response
  reported BIT DEFAULT 0, -- 0 means false here
  reviewer_email VARCHAR(60) NOT NULL,
  not_helpfulness INT DEFAULT 0,

  PRIMARY KEY (id)
);


CREATE TABLE photos (
  id INT AUTO_INCREMENT NOT NULL,
  -- link any row from this table to a review
  review_id INT NOT NULL,
  url VARCHAR(500) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (review_id)
    REFERENCES reviews(id)
);


-- METADATA TABLES

CREATE TABLE characteristics (
  id INT AUTO_INCREMENT NOT NULL,
  name VARCHAR(20) NOT NULL,

  PRIMARY KEY (id)
);

-- join table for characteristic X that's on review Y
CREATE TABLE characteristics_reviews (
  id INT AUTO_INCREMENT NOT NULL,
  characteristic_id INT NOT NULL,
  review_id INT NOT NULL,
  value TINYINT NOT NULL

  PRIMARY KEY (id),
  FOREIGN KEY (characteristic_id)
    REFERENCES characteristics(id),
  FOREIGN KEY (review_id)
    REFERENCES reviews(id)
);
