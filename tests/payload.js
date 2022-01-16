const payload = {
  getQueryParams: {
    page: [0, 10],
    count: [1, 8],
    sort: [
      'newest',
      'helpful',
      'relevant'
    ],
    product_id: [0, 1000011]
  },

  postBodyParams: {
    product_id: [0, 1000011],
    rating: [1, 5],
    summary: ['test', 'my test', 'yet another test'],
    body: ['is this overkill?', 'no... I guess not', 'testing is important!'],
    recommend: [true, false],
    name: ['Elliot_L', 'Adam_K', 'Annie_J'],
    email: ['abcd@e.com', 'fghi@j.com', 'klmn@o.com'],
    photos: ['cat.png', 'iguana.jpeg', 'horse.jpeg', 'seaotter.mp3', 'whale.mov', 'katydid.jpeg'],
    characteristics: [
      [[0, 3000000], [1, 5]],
      [[0, 3000000], [1, 5]],
      [[0, 3000000], [1, 5]]
    ]

  },

  getRand: function(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
  },

  generateValues: function(amount, params) {
    // amount: int
    // params: object literal
    const paramKeys = Object.keys(params);
    var payloadJSON = {
      "keys": paramKeys,
      "values": []
    };

    var currentArray, currentSet;
    for (var i = 0; i < amount; i++) {
      currentArray = [];
      for (var key of paramKeys) {
        currentSet = params[key];
        if (key === 'characteristics') {
          var characteristicsObj = {}
          var tempKey, tempVal;
          for (var arr of currentSet) {
            tempKey = payload.getRand(arr[0][0], arr[0][1]);
            tempVal = payload.getRand(arr[1][0], arr[1][1]);
            characteristicsObj[tempKey] = tempVal;
          }
          currentArray.push(characteristicsObj);
        } else if (key === 'photos') {
          // get an array of two random
          var index1 = payload.getRand(0, currentSet.length - 1);
          var index2 = payload.getRand(0, currentSet.length - 1);
          currentArray.push([currentSet[index1], currentSet[index2]]);
        } else {
          if (typeof currentSet[0] === 'number') {
            currentArray.push(payload.getRand(currentSet[0], currentSet[1]));
          } else if (typeof currentSet[0] === 'string') {
            var randomIndex = payload.getRand(0, currentSet.length - 1);
            currentArray.push(currentSet[randomIndex]);
          } else if (typeof currentSet[0] === 'boolean') {
            currentArray.push(Math.random() < 0.5);
          }
        }


      }
      payloadJSON.values.push(currentArray);
    }

    return payloadJSON;
  }


};


module.exports = payload;

