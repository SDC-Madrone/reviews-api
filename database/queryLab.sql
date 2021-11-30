-- product_id 4 has a reivew with more than one photo
-- product id 27857 has 25 reviews


-- DROP DATABASE IF EXISTS time_sandbox;
-- CREATE DATABASE IF NOT EXISTS time_sandbox;
-- USE time_sandbox;

-- CREATE TABLE IF NOT EXISTS timestrings (
--   id int auto_increment,
--   normaltime DATETIME default DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%dT%TZ'),
--   inttime BIGINT not null,

--   primary key(id)
-- );

-- -- use this in your data load with some SET statement
-- SELECT DATE_FORMAT(FROM_UNIXTIME(6451234),'%Y-%m-%dT%T.000Z');

USE ratings_and_reviews;

      SELECT
        reviews.id AS review_id,
        rating, summary,
        recommend, response,
        body, date,
        reviewer_name, helpfulness,
        (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT("id", id, "url", url)), ']') AS JSON)
          FROM photos
          WHERE review_id = reviews.id
        )
        AS photos
    FROM reviews
    WHERE product_id = 49320
    ORDER BY date DESC
    LIMIT 5;




          FROM photos
          WHERE review_id = reviews.id
