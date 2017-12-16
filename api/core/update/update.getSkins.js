var Promise = require('bluebird');

module.exports = function(user) {
    return gladys.utils.request(sails.config.update.skinBaseUrl)
        .then(function(skins) {
            if(skins === 'Not Found') return Promise.reject(new Error('Not Found'));
            
            return gladys.skin.create(skins);
        });
};