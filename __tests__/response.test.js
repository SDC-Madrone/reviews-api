const app = require('../server/index.js');
const connection = require('../database/connection.js');
const request = require('supertest');

describe('tests for GET /reviews',  function() {

  test('should respond with a 200 status code', async function() {
    const response = await request(app).get('/reviews/?page=0&count=5&sort=newest&product_id=30');
    expect(response.statusCode).toBe(200);
  });

  test('should respond with a json object', async function() {
    const response = await request(app).get('/reviews/?page=0&count=5&sort=newest&product_id=30');
    expect(response.headers['content-type']).toBe('application/json; charset=utf-8')
  });

  test('response object should have a field for "product" that matches the query parameter for product_id', async function(){
    var product_id = '7';
    const response = await request(app).get(`/reviews/?page=0&count=5&sort=newest&product_id=${product_id}`);
    expect(response.body.product).toBe(product_id);
  });

  test('response object should have a results array containing review objects with the appropriate fields', async function() {
    const response = await request(app).get('/reviews/?page=0&count=5&sort=newest&product_id=30');
    expect(Array.isArray(response.body.results)).toBe(true);
    const firstReview = response.body.results[0];
    expect(typeof firstReview.review_id).toBe('number');
    expect(typeof firstReview.recommend).toBe('boolean');
    expect(typeof firstReview.reviewer_name).toBe('string');
    connection.end();
  });
});