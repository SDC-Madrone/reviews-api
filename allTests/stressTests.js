import http from 'k6/http';
import { check, sleep } from 'k6';

const Stage = function(duration, target) {
  this.duration = duration.toString() + 's';
  this.target = target;
};

const Progression = function(warmUpVUS, peakVUS, coolDownVUS) {
  const warmUpTime = 15;
  const peakTime = 30;
  const coolDownTime = 15;

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
  stages: Progression(10, 100, 10)
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

  // http.post(POST_URL, body, params);
  var response = http.get(GET_URL);
  check(response, {
    'status was 200?:': (r) => r.status === 200
  });

  sleep(1);
};

// resume reading docs here: https://k6.io/docs/using-k6/http-requests/
