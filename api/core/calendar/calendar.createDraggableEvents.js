const Promise = require('bluebird');

module.exports = function create(draggable_event) {
    return CalendarDraggableEvents.create(draggable_event);
};