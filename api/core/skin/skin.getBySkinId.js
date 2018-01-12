var queries = require('./skin.queries.js');
var Promise = require('bluebird');

module.exports = function(id) {

    if (!id) {
        return Promise.reject(new Error('Wrong parameters'));
    }

    return gladys.utils.sql(queries.getBySkinId, [id])
        .then(function(skins) {
            if (skins.length === 0) {
                return Promise.reject(new Error('Skin not found'));
            }

            return Promise.resolve(skins[0]);
        });
};