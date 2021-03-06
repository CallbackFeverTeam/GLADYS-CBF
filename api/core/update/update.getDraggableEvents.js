var Promise = require('bluebird');

module.exports = function(user) {
    if(!user || !user.language) {
        return Promise.reject(new Error('No user provided'));
    }
    return gladys.utils.request(sails.config.update.draggableEventsBaseUrl + user.language.substr(0,2) + '.json')
        .then(function(events) {
            if(events === 'Not Found') return Promise.reject(new Error('Not Found'));
            
            return Promise.map(events, function(event){
                return gladys.calendar.createDraggableEvents(event)
                .catch(function(err){
                    return Promise.resolve(); 
                 });
            });
        });
};