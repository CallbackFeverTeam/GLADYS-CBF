var queries = require('./calendar.queries.js');

module.exports = function getByServiceAndUser(options) {
    options = options || {};
    options.service = options.service;
    options.user = options.user;
    
    return gladys.utils.sql(queries.getByServiceAndUser, [options.service, options.user])
    .then(function(calendars){
        
        if(calendars.length === 0){
            return Promise.reject();
        } else {
            return Promise.resolve(calendars[0]);
        }
    });
};