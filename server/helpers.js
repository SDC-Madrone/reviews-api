module.exports = {

  groupCharacteristics: function(characteristics) {
    var group = [];
    for (var id in characteristics) {
      group.push(id, characteristics[id]);
    }
    return group;
  },

  generatePlaceholders: function (table, collection) {
    var placeholder;
    switch(table) {
      case 'photos':
        placeholder = '(@reviewID_to_use, ?)';
        break;
      case 'characteristic_reviews':
        collection = Object.keys(collection);
        placeholder = '(?, @reviewID_to_use, ?)';
    }

    var placeholders = '';
    for (var i = 0; i < collection.length; i++) {
      if (i === collection.length - 1) {
        placeholders += placeholder;
      } else {
        placeholders += `${placeholder}, `;
      }
    }

    return placeholders;
  }
};
