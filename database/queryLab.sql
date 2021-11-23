-- USE ratings_and_reviews;
-- discovered that product_id 4 has a reivew with more than one photo

USE ratings_and_reviews;

-- use later:
    -- insert into reviews values: (?, ?, ?, ?, ?, ?, ?)
    -- insert into photos values: (@reviewID_to_use, ?)
    -- insert into char_rev values: (?, @reviewID_to_use, ?);

BEGIN;
INSERT INTO reviews (product_id, rating,
    summary, recommend,
    body, date,
    reviewer_name, reviewer_email)
    VALUES (903, 5,
        '', 'true',
        'this product REALLY rocks uWu Im dreaming about it',
        69,
        'elichten94', 'sdfasdf@whut.net'
    );
SET @reviewID_to_use = LAST_INSERT_ID();
INSERT INTO photos (review_id, url)
    VALUES (@reviewID_to_use, 'qwerzxcsadf.com');
INSERT INTO characteristic_reviews (characteristic_id, review_id, value)
    VALUES (11, @reviewID_to_use, 4);
COMMIT;


-- INSERT INTO species (name, genus_id)
--     VALUES ('verna', (SELECT id from genera WHERE name = 'amanita')), ('angusticeps', (SELECT id from genera WHERE name = 'morchella'));