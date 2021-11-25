import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  stages: [
    { duration: '2s', target: 1 }
  ]
};

export default function () {
  const getUrl = `http://localhost:3000/reviews/?page=${0}&count=${5}&sort=${'newest'}&product_id=${750}`;
  const postUrl = 'http://localhost:3000/reviews/';

  // todo: generate input with math.random for the characteristics and photos

  const body = JSON.stringify({
    "product_id": 54321,
    "rating": 1,
    "summary": "test",
    "body": "testing",
    "recommend": false,
    "name": "tester_bester_hecc",
    "email": "tomatoes@nightshade.com",
    "photos": [],
    "characteristics": {"10": 1, "9": 3, "15": 5}
  });

  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  http.post(postUrl, body, params);
  sleep(1);
};

// resume reading docs here: https://k6.io/docs/using-k6/http-requests/
