var queries = require('./todolist.queries.js');
var Promise = require('bluebird');

module.exports = function(user) {

    if (!user) {
        return Promise.reject(new Error('Wrong parameters'));
    }

    return gladys.utils.sql(queries.getByUser, [user])
        .then(function(tasks) {
            return tasks;
        });
};