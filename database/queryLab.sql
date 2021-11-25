USE ratings_and_reviews;
-- product_id 4 has a reivew with more than one photo
-- product id 27857 has 25 reviews


-- {
--     "product_id": "61579",
--     "ratings": {
--         "1": "1",
--         "2": "11",
--         "3": "6",
--         "4": "7",
--         "5": "1"
--     },
--     "recommended": {
--         "false": "7",
--         "true": "19"
--     },
--     "characteristics": {
--         "Size": {
--             "id": 206686,
--             "value": "4.0400000000000000"
--         },
--         "Width": {
--             "id": 206687,
--             "value": "3.4000000000000000"
--         },
--         "Comfort": {
--             "id": 206688,
--             "value": "2.8800000000000000"
--         },
--         "Quality": {
--             "id": 206689,
--             "value": "2.2400000000000000"
--         }
--     }
-- }
-- select COUNT(id) as review_count, product_id
-- from reviews
-- group by product_id
-- order by review_count desc
-- limit 10;

    --   SELECT reviews.id AS review_id,
    --     rating, summary,
    --     recommend, response,
    --     body, date,
    --     reviewer_name, helpfulness,
    --     (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT("id", id, "url", url)), ']') AS JSON)
    --       FROM photos
    --       WHERE review_id = reviews.id
    --     )
    --     AS photos
    -- FROM reviews
    -- WHERE product_id = 27857 AND reported = 'false'
    -- ORDER BY date DESC, helpfulness DESC
    -- LIMIT 4;

DROP DATABASE IF EXISTS time_sandbox;
CREATE DATABASE IF NOT EXISTS time_sandbox;
USE time_sandbox;

CREATE TABLE IF NOT EXISTS timestrings (
  id int auto_increment,
  normaltime DATETIME default DATE_FORMAT(CURRENT_TIMESTAMP, '%Y-%m-%dT%TZ'),
  inttime BIGINT not null,

  primary key(id)
);

-- use this in your data load with some SET statement
SELECT DATE_FORMAT(FROM_UNIXTIME(6451234),'%Y-%m-%dT%T.000Z');
