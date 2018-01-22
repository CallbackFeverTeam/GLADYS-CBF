var fs = require('fs');

module.export = function(){
    fs.readFile('log/logtest.log', function read(err, data) {
        if (err) {
            sails.log.debug(err)
        }

        sails.log.debug('Reading file !')
        gladys.socket.emit('log', data);

    });
}