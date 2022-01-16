import http from 'k6/http';
import { check, sleep } from 'k6';

const Stage = function(duration, target) {
  this.duration = duration.toString() + 's';
  this.target = target;
};

const Progression = function(warmUpVUS, peakVUS, coolDownVUS) {
  const warmUpTime = 10;
  const accelTime = 10;
  const peakTime = 30;
  const decelTime =  10;
  const coolDownTime = 10;

  var accelVUS = Math.floor((warmUpVUS + peakVUS) / 2);
  var decelVUS = Math.floor((coolDownVUS + peakVUS) / 2);
  return [
    new Stage(warmUpTime, warmUpVUS),
    new Stage(accelTime, accelVUS),
    new Stage(peakTime, peakVUS),
    new Stage(decelTime, decelVUS),
    new Stage(coolDownTime, coolDownVUS)
  ];
};

var char_id = Math.floor(Math.random() * 3347679);
var char_ids = [char_id, Math.floor(char_id / 2), Math.floor(char_id / 3)];
var characteristics = {};
characteristics[char_ids[0]] = Math.ceil(Math.random() * 5);
characteristics[char_ids[1]] = Math.ceil(Math.random() * 5);
characteristics[char_ids[2]] = Math.ceil(Math.random() * 5);

var body = JSON.stringify({
  "product_id": Math.floor(Math.random() * 1000000),
  "rating": 1,
  "summary": "test",
  "body": "testing",
  "recommend": false,
  "name": "tester_bester",
  "email": "testingK6@testing.com",
  "photos": [],
  "characteristics": characteristics
});

export const options = {
  stages: Progression(20, 300, 20)
};

export default function () {
  const params = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  var response = http.get(`http://localhost:4000/reviews/?page=${0}&count=${5}&sort=${'newest'}&product_id=${Math.floor(Math.random() * 1000011)}`);
  check(response, {
    'status was 200:': (r) => r.status === 200
  });

  // comment out lines 59-62 and uncomment the below to test POST /reviews
  // var response = http.post(`http://localhost:4000/reviews/`, body, params);
  //   check(response, {
  //   'status was 201:': (r) => r.status === 201
  // });

  sleep(1);
};
