CREATE DATABASE IF NOT EXISTS ratings_and_reviews;
USE ratings_and_reviews;

CREATE TABLE reviews (
  id: INT AUTO_INCREMENT,
  product_id: INT,
  user_id: INT,
  helpful_count: INT,
  not_helpful_count: INT,
  created_at: DATETIME,
  rating: SMALLINT,
  recommended: BOOLEAN,
  title_summary: VARCHAR(60),
  body: VARCHAR(1000)
);

CREATE TABLE photos (
  id: INT AUTO_INCREMENT,
  review_id: INT,
  url: VARCHAR(500)
);

CREATE TABLE characteristics (
  id: INT AUTO_INCREMENT,
  name: VARCHAR(20),
  value: SMALLINT
);

CREATE TABLE users (
  id: INT AUTO_INCREMENT,
  username: VARCHAR(60),
  email: VARCHAR(60),
);

