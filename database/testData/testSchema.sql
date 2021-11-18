CREATE DATABASE IF NOT EXISTS reviews_test;
USE reviews_test;


CREATE TABLE IF NOT EXISTS reviews (
  -- sent with response
  id INT AUTO_INCREMENT NOT NULL,
  product_id INT NOT NULL, -- goes in outer object of response
  rating TINYINT NOT NULL,
  summary VARCHAR(60) DEFAULT NULL,
  recommend BIT NOT NULL, -- boolean type BIT can be 1 (true) or 0 (false)
  response VARCHAR(1000) DEFAULT NULL,
  body VARCHAR(1000) NOT NULL,
  date BIGINT NOT NULL, -- NOTE: when inserting from the driver, use Date.now()
  reviewer_name VARCHAR(60) NOT NULL,
  helpfulness INT DEFAULT 0,

  -- not sent with response
  reported BIT DEFAULT 0, -- 0 means false here
  reviewer_email VARCHAR(60) NOT NULL,
  not_helpfulness INT DEFAULT 0,

  PRIMARY KEY (id)
);

-- corresponds to reviews_photos.csv
CREATE TABLE IF NOT EXISTS photos (
  id INT AUTO_INCREMENT NOT NULL,
  -- link any row from this table to a review
  review_id INT NOT NULL,
  url VARCHAR(2048) NOT NULL,

  PRIMARY KEY (id),
  FOREIGN KEY (review_id)
    REFERENCES reviews(id)
);


-- METADATA TABLES

-- corresponds to characteristics.csv
CREATE TABLE IF NOT EXISTS characteristics (
  id INT AUTO_INCREMENT NOT NULL,
  product_id INT NOT NULL,
  name VARCHAR(20) NOT NULL,

  PRIMARY KEY (id)
);

-- join table for characteristic X that's on review Y
-- corresponds to characteristic_reviews.csv
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
);
