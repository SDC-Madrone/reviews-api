-- for a given review_id, get all objects of id: x, url: xxxxx from photos

-- SELECT JSON_OBJECT("id", id, "url", url) FROM photos WHERE review_id = 5;

USE ratings_and_reviews;

-- SELECT JSON_OBJECT(
--   "product", (select reviews.product_id from reviews where reviews.id = 19),
--   "page", 0,
--   "count", 5,
--   "results", JSON_ARRAY(
--     "foo", "bar", "baz",
--     JSON_OBJECT(
--       "review_id":
--     )
--   )
-- ) AS results
-- from reviews
-- WHERE reviews.product_id = 5;



-- select count(photos.id) as photo_count, reviews.id as reviewID from reviews
-- inner join photos on reviews.id = photos.review_id
-- group by reviews.id
-- having count(photos.id) = 2
-- limit 10;


-- select product_id from reviews where id = 10;
-- select count(photos.id), review_id from photos where review_id = 10;

select reviews.id AS review_id, product_id, rating, summary, recommend, response, body, date, reviewer_name, helpfulness,
    (SELECT CAST(CONCAT('[', GROUP_CONCAT(JSON_OBJECT("id", id, "url", url)), ']') AS JSON)
    FROM photos WHERE review_id = reviews.id)
AS photos
FROM reviews
WHERE product_id = 4;


-- GROUP BY reviews.id;


-- discovered that product_id 4 has a reivew with more than one photo




-- select filtered_reviews.product_id, photos.id, photos.url
-- from photos
-- join (
--     -- only these columns are available in the filtered_reviews
--     SELECT id, reviewer_name, product_id
--     from reviews
--     where product_id = 4
-- ) as filtered_reviews
-- ON photos.review_id = filtered_reviews.id;




-- {
--   "product": "2",
--   "page": 0,
--   "count": 5,
--   "results": [
--     {
--       "review_id": 5,
--       "rating": 3,
--       "summary": "I'm enjoying wearing these shades",
--       "recommend": false,
--       "response": null,
--       "body": "Comfortable and practical.",
--       "date": "2019-04-14T00:00:00.000Z",
--       "reviewer_name": "shortandsweeet",
--       "helpfulness": 5,
--       "photos": [{
--           "id": 1,
--           "url": "urlplaceholder/review_5_photo_number_1.jpg"
--         },
--         {
--           "id": 2,
--           "url": "urlplaceholder/review_5_photo_number_2.jpg"
--         },
--         // ...
--       ]
--     },
--     {
--       "review_id": 3,
--       "rating": 4,
--       "summary": "I am liking these glasses",
--       "recommend": false,
--       "response": "Glad you're enjoying the product!",
--       "body": "They are very dark. But that's good because I'm in very sunny spots",
--       "date": "2019-06-23T00:00:00.000Z",
--       "reviewer_name": "bigbrotherbenjamin",
--       "helpfulness": 5,
--       "photos": [],
--     },
--     // ...
--   ]
-- }



    -- (SELECT
    --   reviews.id AS review_id,
    --   product_id, rating,
    --   summary, recommend,
    --   response, body,
    --   date, reviewer_name,
    --   helpfulness, JSON_ARRAY(
    --     (SELECT id, url FROM photos WHERE review_id = reviews.id)
    --   ) AS photos

    --   FROM reviews INNER JOIN photos ON reviews.id = photos.review_id
    --     WHERE reviews.product_id = 5)
