var queries = require('./skin.queries.js');

module.exports = function (skin){
    return gladys.utils.sql(queries.delete, [skin.id]);
};