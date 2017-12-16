var queries = require('./skin.queries.js');
var Promise = require('bluebird');

module.exports = function(options) {

    if (!options || !options.id) {
        return Promise.reject(new Error('Wrong parameters'));
    }

    return gladys.utils.sql(queries.getById, [options.id])
        .then(function(skin) {
            if (skin.length === 0) {
                return Promise.reject(new Error('Skin not found'));
            }

            return Promise.resolve(skin[0]);
        });
};