const helpers = {

  parse: function(string) {
    var results = [];
    var rows = string.split('\n');
    var entry;
    for (var i = 0; i < rows.length; i++) {
      rows[i] = rows[i].split(',');
      for (var k = 0; k < rows[i].length; k++) {
        entry = rows[i][k];
        if (entry.length !== 0 && entry[0] === '"') {
          rows[i][k] = entry.slice(1, entry.length - 1);
        }
      }
    }

    // console.log('should now be an array of arrays: ', rows);
    return rows;

  }

};

module.exports = helpers;
