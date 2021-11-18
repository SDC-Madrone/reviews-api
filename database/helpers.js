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

        if (entry === 'true') {
          rows[i][k] = '1';
        } else if (entry === 'false') {
          rows[i][k] = '0';
        }
      }
    }

    // console.log('should now be an array of arrays: ', rows);
    return rows;

  },

  generateQueryString: function(tableName, row) {
    var placeHolders = row.map((item, i, arr) => {
      return '?';
    });
    var placeHolderString = placeHolders.join(', ');

    var queryString;

    if (tableName === 'reviews') {
      queryString = `INSERT INTO ${tableName} (id, product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness) VALUES (${placeHolderString});`;
    } else {
      queryString = `INSERT INTO ${tableName} VALUES (${placeHolderString});`
    }

    return queryString;
  };

};

module.exports = helpers;
