-- USE ratings_and_reviews;
-- discovered that product_id 4 has a reivew with more than one photo

-- USE ratings_and_reviews;

-- BEGIN;
-- INSERT INTO reviews (product_id, rating,
--     summary, recommend,
--     body, date,
--     reviewer_name, reviewer_email)
--     VALUES (903, 5,
--         '', 'true',
--         'this product REALLY rocks uWu Im dreaming about it',
--         69,
--         'elichten94', 'sdfasdf@whut.net'
--     );
-- SET @reviewID_to_use = LAST_INSERT_ID();
-- INSERT INTO photos (review_id, url)
--     VALUES (@reviewID_to_use, 'qwerzxcsadf.com');
-- INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
--     VALUES (11, @reviewID_to_use, 4);
-- COMMIT;

USE ratings_and_reviews;


 BEGIN;
 INSERT INTO reviews (product_id, rating, summary, recommend, body, date, reviewer_name, reviewer_email)
 VALUES (69, 2, 'omg I do not love this prod', false, 'asdfasdf', 1637713985008, 'ellio1994', 'asdfasdf@sdfsf.net');

 SET @reviewID_to_use = LAST_INSERT_ID();
 INSERT INTO photos (review_id, url)
 VALUES (@reviewID_to_use, 'sdafsdf'), (@reviewID_to_use, 'rtyerteyr');
 INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
 VALUES ('2', @reviewID_to_use, 4), ('7', @reviewID_to_use, 2);
 COMMIT;