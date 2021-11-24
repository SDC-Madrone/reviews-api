const app = require('../server/index.js');
const pool = require('../server/connection.js');
const request = require('supertest');

// increment 5 each test
const GET_PRODUCT_ID = 5197467;
const POST_PRODUCT_ID = 70;

const SORT_BY = 'helpful';
const COUNT = 5;
const PAGE = 0;

var increment = 0;
var sampleBody = {
  "product_id": POST_PRODUCT_ID + increment,
  "rating": 4,
  "summary": "I think I had a dream about this hat",
  "body": "What a great product, I avoided many-a-sunburns and hope everyone with sensitive forehead skin will enjoy the mesh comfort",
  "recommend": true,
  "name": "too_much_sun52",
  "email": "tomatoes@bean.net",
  "photos": [
      "https://www.google.com/search?q=sea+otter&sxsrf=AOaemvJ9TtTJqiWPY3MElH-UhH3C28tRPw:1637737601528&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjxr-X_t7D0AhUKlIkEHYOWC3MQ_AUoAXoECAEQAw&biw=2048&bih=1062&dpr=1.25#imgrc=_WBlfFF9OinySM",
      "https://www.google.com/search?q=sea+otter&sxsrf=AOaemvJ9TtTJqiWPY3MElH-UhH3C28tRPw:1637737601528&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjxr-X_t7D0AhUKlIkEHYOWC3MQ_AUoAXoECAEQAw&biw=2048&bih=1062&dpr=1.25#imgrc=7Ay615yrIYTq9M"
  ],
  "characteristics": {"15": 3, "9": 4, "27": 3}
};

const testGet = () => {
  var getStartTime = Date.now();
  console.log('testing GET...');
  request(app).get(`/reviews/?page=${PAGE}&count=${COUNT}&sort=${SORT_BY}&product_id=${GET_PRODUCT_ID}`)
    .then(() => {
      console.log('testing GET...');
      return request(app).get(`/reviews/?page=${PAGE}&count=${COUNT}&sort=${SORT_BY}&product_id=${GET_PRODUCT_ID + 1}`);
    })
    .then(() => {
      console.log('testing GET...');
      return request(app).get(`/reviews/?page=${PAGE}&count=${COUNT}&sort=${SORT_BY}&product_id=${GET_PRODUCT_ID + 2}`);
    })
    .then(() => {
      console.log('testing GET...');
      return request(app).get(`/reviews/?page=${PAGE}&count=${COUNT}&sort=${SORT_BY}&product_id=${GET_PRODUCT_ID + 3}`);
    })
    .then(() => {
      console.log('testing GET...');
      return request(app).get(`/reviews/?page=${PAGE}&count=${COUNT}&sort=${SORT_BY}&product_id=${GET_PRODUCT_ID + 4}`);
    })
    .then(() => {
      var getEndTime = Date.now();
      var avg = ((getEndTime - getStartTime) / 1000) / 5;
      console.log(`average request time: ${avg}`);
      testPost();
    })
    .catch((err) => {
      console.log('error testing GET');
      pool.end();
      throw err;
    });
};

const testPost = () => {
  var postStartTime = Date.now();
  console.log('testing POST...');

  request(app).post(`/reviews`)
    .send(sampleBody)
      .then(() => {
        increment++;
        console.log('testing POST...');
        return request(app).post(`/reviews`)
          .send(sampleBody);
      })
      .then(() => {
        increment++;
        console.log('testing POST...');
        return request(app).post(`/reviews`)
          .send(sampleBody);
      })
      .then(() => {
        increment++;
        console.log('testing POST...');
        return request(app).post(`/reviews`)
          .send(sampleBody);
      })
      .then(() => {
        increment++;
        console.log('testing POST...');
        return request(app).post(`/reviews`)
          .send(sampleBody);
      })
      .then(() => {
        var postEndTime = Date.now();
        var avg = ((postEndTime - postStartTime) / 1000) / 5;
        console.log(`average request time: ${avg}`);
        pool.end();
      }).catch((err) => {
        console.log('error testing POST ');
        pool.end();
        throw err;
      });
};

testGet();
