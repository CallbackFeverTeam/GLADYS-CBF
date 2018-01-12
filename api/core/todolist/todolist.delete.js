var queries = require('./todolist.queries.js');

module.exports = function (task){
    return gladys.utils.sql(queries.delete, [task.id]);
};