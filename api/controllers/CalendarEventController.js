/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
/**
 * CalendarEventController
 *
 * @description :: Server-side logic for managing Calendarevents
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * Get event by day
    */

   index: function(req, res, next){
     var options = req.query;
     options.user = req.session.User;

      gladys.calendar.getEventsDates(options)
        .then((calendarEvents) =>  res.json(calendarEvents))
        .catch(next);
    },

    /**
     * Get all event
    */

   get: function(req, res, next){
    var options = req.query;
    options.user = req.session.User;

     gladys.calendar.getAllEvents(options)
       .then((calendarEvents) =>  res.json(calendarEvents))
       .catch(next);
    },
  
    /**
     * Create a draggable event
     */
    create: function(req, res, next) {
      gladys.calendar.createEvent(req.body)
        .then((event) => res.status(201).json(event))
        .catch(next);
    },
    
    /**
     * Update calendar event
    */
    update: function(req, res, next){
      req.body.id = req.params.id;
      gladys.calendar.updateEvent(req.body)
        .then(function(event){
            return res.json(event);
        })
        .catch(next);
    },

    /**
     * Delete calendar event
     */
    delete: function(req, res, next){
        req.body.id = req.params.id;
        gladys.calendar.deleteEvent(req.body)
          .then(function(event){
              return res.json(event);
          })
          .catch(next);
    },

};