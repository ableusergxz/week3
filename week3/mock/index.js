var indexData = require("./data/home.json");

var mockApi = {
    '/api/get_index': indexData
}

module.exports = function(url) {
    return mockApi[url];
}