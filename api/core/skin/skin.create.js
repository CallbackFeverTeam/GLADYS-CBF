var queries = require('./skin.queries.js');
var Promise = require('bluebird');

module.exports = function(skin) {

    sails.log.debug(skin)
    if (!skin.skinId) {
        return Promise.reject(new Error('Wrong parameters'));
    }

    return gladys.utils.sql(queries.getBySkinId, [skin.skinId])
        .then(function(skins) {
            if(skins.length){
             
                // skin already exist
                return Promise.resolve(skins[0]);
            } else {

                return Skin.create(skin);
            }
        });
};