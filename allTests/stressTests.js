import http from 'k6/http';
import { check, sleep } from 'k6';

const Stage = function(duration, target) {
  this.duration = duration.toString() + 's';
  this.target = target;
};

const Progression = function(warmUpVUS, peakVUS, coolDownVUS) {
  const warmUpTime = 10;
  const peakTime = 10;
  const coolDownTime = 2;

  return [
    new Stage(warmUpTime, warmUpVUS),
    new Stage(peakTime, peakVUS),
    new Stage(coolDownTime, coolDownVUS)
  ];
};


var body = JSON.stringify({
  "product_id": 543214,
  "rating": 1,
  "summary": "test",
  "body": "testing",
  "recommend": false,
  "name": "tester_bester_hecc",
  "email": "tomatoes@nightshade.com",
  "photos": [],
  "characteristics": {"10": 1, "9": 3, "15": 5}
});


export const options = {
  stages: Progression(10, 500, 10)
};

export default function () {
  const GET_URL = `http://localhost:3000/reviews/?page=${0}&count=${5}&sort=${'newest'}&product_id=${43721}`;
  const POST_URL = 'http://localhost:3000/reviews/';

  // todo: generate input with math.random for the characteristics and photos


  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(`VU-id: ${__VU}  -  Iteration: ${__ITER}`);

  // http.post(POST_URL, body, params);
  var response = http.get(`http://localhost:3000/reviews/?page=${0}&count=${5}&sort=${'newest'}&product_id=${Math.floor(Math.random() * 5000000)}`);
  check(response, {
    'status was 200?:': (r) => r.status === 200
  });

  sleep(1);
};

// resume reading docs here: https://k6.io/docs/using-k6/http-requests/
