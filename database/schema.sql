CREATE DATABASE IF NOT EXISTS ratings_and_reviews;
USE ratings_and_reviews;


CREATE TABLE reviews (
  -- sent with response:
  id: INT AUTO_INCREMENT,
  product_id: INT, -- goes in outer object
  rating: SMALLINT,
  summary: VARCHAR(60),
    -- boolean type, BIT, just takes 1 (true) or 0 (false)
  recommend: BIT,
  response: VARCHAR(1000),
  body: VARCHAR(1000),
  date: DATETIME,
  reviewer_name: VARCHAR(60),
  helpfulness: INT,

  -- not sent with response
  reported: BIT,
  reviewer_email: VARCHAR(60),
  not_helpfulness: INT
);


CREATE TABLE photos (
  id: INT AUTO_INCREMENT,
  -- link any row from this table to a review
  review_id: INT,
  url: VARCHAR(500),

PRIMARY KEY (id),
FOREIGN KEY (review_id)
  REFERENCES reviews(id)
);


CREATE TABLE characteristics (
  id: INT AUTO_INCREMENT,
  product_id: INT,
  name: VARCHAR(20),
  value: SMALLINT,

  PRIMARY KEY (id)
);


CREATE TABLE reccomended (
  id: INT AUTO_INCREMENT,
  product_id: INT,
  false: INT,
  true: INT,

  PRIMARY KEY (id)
)


CREATE TABLE ratings (
  id: INT AUTO_INCREMENT,
  product_id: INT
  1: SMALLINT,
  2: SMALLINT,
  3: SMALLINT,
  4: SMALLINT,
  5: SMALLINT
);
