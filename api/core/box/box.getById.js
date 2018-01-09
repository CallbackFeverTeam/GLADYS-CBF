var queries = require('./box.queries.js');

module.exports = function (id){
  return gladys.utils.sql(queries.getById, [id]);  
};