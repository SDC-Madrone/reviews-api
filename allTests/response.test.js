const app = require('../server/index.js');
const pool = require('../server/connection.js');
const request = require('supertest');

var sampleParams = {
  product_id: 544,
  count: 5,
  sort: 'helpful',
  page: 0
};

describe('tests for GET /reviews',  function() {
  var { product_id, count, sort, page } = sampleParams;
  const GET_URL = `/reviews/?page=${page}&count=${count}&sort=${sort}&product_id=${product_id}`;

  test('should respond with a 200 status code', async function() {
    const response = await request(app).get(GET_URL);
    expect(response.statusCode).toBe(200);
  });

  test('should respond with a json object', async function() {
    const response = await request(app).get(GET_URL);
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
  });

  test('response object should have a field for "product" that matches the query parameter for product_id', async function(){
    var custom_product_id = '7';
    const response = await request(app).get(`/reviews/?page=${page}&count=${count}&sort=${sort}&product_id=${custom_product_id}`);
    expect(response.body.product).toBe(custom_product_id);
  });

  test('response object should have a results array', async function() {
    const response = await request(app).get(GET_URL);
    expect(Array.isArray(response.body.results)).toBe(true);
  });

  test('results array should contain review objects with the appropriate fields', async function() {
    const response = await request(app).get(GET_URL);
    const firstReview = response.body.results[0];
    expect(typeof firstReview.review_id).toBe('number');
    expect(typeof firstReview.recommend).toBe('boolean');
    expect(typeof firstReview.reviewer_name).toBe('string');
  });

  test('should return the correct results for a given product_id', async function() {
    const response = await request(app).get(`/reviews/?page=${page}&count=${count}&sort=${sort}&product_id=${product_id}`);
    const firstReview = response.body.results[0];
    expect(firstReview.review_id).toBe(3062);
    expect(firstReview.recommend).toBe(true);
    expect(firstReview.response).toBeNull;
    expect(firstReview.reviewer_name).toBe('Keshawn.Schoen44');
  });
});

var sampleBody = {
  "product_id": 9002,
  "rating": 4,
  "summary": "Great hat",
  "body": "What a great product, I avoided many sunburns and hope everyone with sensitive skin will enjoy the mesh comfort",
  "recommend": true,
  "name": "tom_tomato94",
  "email": "tomatoes@nightshade.com",
  "photos": [
      "https://www.google.com/search?q=sea+otter&sxsrf=AOaemvJ9TtTJqiWPY3MElH-UhH3C28tRPw:1637737601528&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjxr-X_t7D0AhUKlIkEHYOWC3MQ_AUoAXoECAEQAw&biw=2048&bih=1062&dpr=1.25#imgrc=_WBlfFF9OinySM",
      "https://www.google.com/search?q=sea+otter&sxsrf=AOaemvJ9TtTJqiWPY3MElH-UhH3C28tRPw:1637737601528&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjxr-X_t7D0AhUKlIkEHYOWC3MQ_AUoAXoECAEQAw&biw=2048&bih=1062&dpr=1.25#imgrc=7Ay615yrIYTq9M"
  ],
  "characteristics": {"15": 3, "9": 4, "27": 3}
};

describe('tests for POST reviews', function() {
  test('should respond with a 201 status code', async function() {
    const response = await request(app).post('/reviews')
      .send(sampleBody);
      expect(response.statusCode).toBe(201);
  });

  test('should add reviews to the "reviews" table in database', async function() {
    sampleBody.product_id++;
    await request(app).post('/reviews')
      .send(sampleBody);
    const response = await request(app).get(`/reviews/?page=0&count=5&sort=newest&product_id=${sampleBody.product_id}`);
    const mostRecentReview = response.body.results[0];
    expect(mostRecentReview.summary).toBe('Great hat');
    expect(mostRecentReview.reviewer_name).toBe('tom_tomato94');

  });

  test('sending an incomplete request body should return a status code 400', async function () {
    var incompleteBody = {
      "product_id": 9002,
      "summary": "this is a bad request",
      "recommend": false,
      "name": "tom_tomato94",
    };

    const response = await request(app).post('/reviews')
      .send(incompleteBody);
    expect(response.statusCode).toBe(400);
  });

  test('failed writes should maintain ACID protocol', async function() {
    // give complete request with null/wrong-type fields
    var badlyTypedBody = {
      "product_id": 600,
      "rating": 4,
      "summary": "This should not show up in the database",
      "body": "This is a faulty request",
      "recommend": false,
      "name": "hacker94",
      "email": "badactivity@bad.net",
      "photos": [
          null,
          null
      ],
      "characteristics": {"5": 10, "9": null, "27": -4}
    }

    await request(app).post('/reviews')
      .send(badlyTypedBody);
    const response = await request(app).get(`/reviews/?page=0&count=5&sort=newest&product_id=${600}`);
    var reviewNames = response.body.results.map(review => review.reviewer_name);
    // console.log('results:', response.body.results);
    expect(reviewNames).not.toContain('hacker94');
    pool.end();

  });


  // test('should add review metadata to the "characteristic_reviews" table in database', async function() {
  //   sampleBody.product_id++;
  //   await request
  // });
});
