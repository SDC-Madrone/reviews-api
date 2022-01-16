const app = require('../server/index.js');
const pool = require('../server/connection.js');
const request = require('supertest');


const readline = require('readline');
const { stdin: input, stdout: output } = require('process');
const rl = readline.createInterface({ input, output });


const promptParameters = function(prompt) {
  return new Promise((resolve, reject) => {
    rl.question(prompt, (answer) => {
      resolve(answer);
      rl.close();
    });
  });
};


const promptGET = function() {
  var GET_PRODUCT_ID, POST_PRODUCT_ID, COUNT, PAGE, SORT_BY;
  promptParameters('Enter product ID to get reviews for: ')
  .then((answer) => {
    GET_PRODUCT_ID = answer;
    return promptParameters('Eneter product ID to post reviews to: ');
  })
  .then((answer) => {
    POST_PRODUCT_ID = answer;
    return promptParameters('Enter count: ');
  })
  .then((answer) => {
    COUNT = answer;
    return promptParameters('Enter page: ');
  })
  .then((answer) => {
    PAGE = answer;
    return promptParameters('Enter sort method [newest | relevant | helpful]: '
  })
  .then((answer) => {
    SORT_BY = answer;
    testGet(GET_PRODUCT_ID, COUNT, PAGE, SORT_BY);
  })
  .catch((err) => {
    console.err('Prompt error: ', err);
  });
};


const promptPOST = function() {
  var POST_PRODUCT_ID;
}


const testGet = (GET_PRODUCT_ID, COUNT, PAGE, SORT_BY) => {
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
      console.log(`average GET request time: ${avg}`);
      testPost();
    })
    .catch((err) => {
      console.error('error testing GET', err);
      pool.end();
    });
};

const testPost = (POST_PRODUCT_ID) => {
  var sampleBody = {
    "product_id": POST_PRODUCT_ID,
    "rating": 4,
    "summary": "I love this hat",
    "body": "I really enjoyed the mesh comfort",
    "recommend": true,
    "name": "sun_beetle3",
    "email": "testing@test.com",
    "photos": [
        "https://www.google.com/search?q=sea+otter&sxsrf=AOaemvJ9TtTJqiWPY3MElH-UhH3C28tRPw:1637737601528&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjxr-X_t7D0AhUKlIkEHYOWC3MQ_AUoAXoECAEQAw&biw=2048&bih=1062&dpr=1.25#imgrc=_WBlfFF9OinySM",
        "https://www.google.com/search?q=sea+otter&sxsrf=AOaemvJ9TtTJqiWPY3MElH-UhH3C28tRPw:1637737601528&source=lnms&tbm=isch&sa=X&ved=2ahUKEwjxr-X_t7D0AhUKlIkEHYOWC3MQ_AUoAXoECAEQAw&biw=2048&bih=1062&dpr=1.25#imgrc=7Ay615yrIYTq9M"
    ],
    "characteristics": {"15": 3, "9": 4, "27": 3}
  };


  var postStartTime = Date.now();
  console.log('testing POST...');

  request(app).post(`/reviews`)
    .send(sampleBody)
      .then(() => {

        console.log('testing POST...');
        return request(app).post(`/reviews`)
          .send(sampleBody);
      })
      .then(() => {

        console.log('testing POST...');
        return request(app).post(`/reviews`)
          .send(sampleBody);
      })
      .then(() => {

        console.log('testing POST...');
        return request(app).post(`/reviews`)
          .send(sampleBody);
      })
      .then(() => {

        console.log('testing POST...');
        return request(app).post(`/reviews`)
          .send(sampleBody);
      })
      .then(() => {
        var postEndTime = Date.now();
        var avg = ((postEndTime - postStartTime) / 1000) / 5;
        console.log(`average POST request time: ${avg}`);
        pool.end();
      }).catch((err) => {
        console.log('error testing POST', err);
        pool.end();
      });
};

testGet();
