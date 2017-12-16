var Promise = require('bluebird');

module.exports = function update(skin) {
    var id = skin.id;
    delete skin.id;
    return skin.update({
            id: id
        }, skin)
        .then(function(skins) {
            if (skins.length === 0) {
                return Promise.reject(new Error('skin not found'));
            } else {
                return Promise.resolve(skins[0]);
            }
        });
};