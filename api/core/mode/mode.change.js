var queries = require('./mode.queries.js');

module.exports = function(modeParams){

    var query = queries.getByCode;
    var param = modeParams.mode;

    // handling scenario
    if(modeParams.params && modeParams.params.mode) {
        query = queries.getById;
        param = modeParams.params.mode;
        modeParams = modeParams.params;
    }

    if(!modeParams.house || !modeParams.mode){
        return Promise.reject(new Error('Missing parameters'));
    }

    // get mode id
    return gladys.utils.sqlUnique(query, [param])
        .then((mode) => {
            return gladys.event.create({
                code: 'house-mode-changed',
                house: modeParams.house,
                value: modeParams.mode,
                scope: {
                    mode: mode.id
                }
            });  
        });
};