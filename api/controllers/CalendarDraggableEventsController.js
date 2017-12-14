/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
/**
 * CalendarDraggablrEventsController
 *
 * @description :: Server-side logic for managing Calendardraggableevents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * Create a draggable event
     */
    createDraggableEvent: function(req, res, next) {
        gladys.calendar.createDraggableEvents(req.body)
          .then((event) => res.status(201).json(event))
          .catch(next);
    },

    /**
     * Delete a draggable event
     */
    deleteDraggableEvent: function(req, res, next) {
        gladys.calendar.deleteDraggableEvents({
                id: req.params.id
            })
            .then(function(event) {
                return res.json(event);
            })
            .catch(next);
    },

    /**
     * Get a draggable event by user 
     */

    getDraggableEventByUser: function(req, res, next) {
    var options = req.query;
    options.user = req.session.User;
    
    gladys.calendar.getDraggableEventsByUser(options)
        .then((events) => res.json(events))
        .catch(next);
    },


};