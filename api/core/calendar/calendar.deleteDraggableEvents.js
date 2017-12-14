var queries = require('./calendar.queries.js');

module.exports = function (draggable_event){
    return gladys.utils.sql(queries.deleteDraggableEvent, [draggable_event.id]);
};