/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
  
(function () {
    'use strict';

    angular
        .module('gladys')
        .factory('calendarService', calendarService);

    calendarService.$inject = ['$http'];

    function calendarService($http) {
        var service = {
            getCalendarByServiceAndUser: getCalendarByServiceAndUser,
            createCalendar: createCalendar,
            loadEvents: loadEvents,
            loadAllEvents: loadAllEvents,
            createEvent: createEvent,
            updateEvent: updateEvent,
            deleteEvent: deleteEvent,
            loadDraggableEvents: loadDraggableEvents,
            deleteDraggableEvent: deleteDraggableEvent,
            createDraggableEvent: createDraggableEvent
        };

        return service;

        function getCalendarByServiceAndUser(service, user) {
            return $http({method: 'GET', url: '/calendar/service/', params: {service: service, user: user} });
        }

        function createCalendar(calendar){
            return $http({method: 'POST', url: '/calendar', data: calendar });
        }

        function loadEvents(date) {
            var start = new Date(date);
            start.setHours(0);
            start.setMinutes(0);
            start.setSeconds(0);

            var end = new Date(date);
            end.setHours(23);
            end.setMinutes(59);
            end.setSeconds(59);


            return $http({method: 'GET', url: '/calendarevent', params: {start: start, end: end} });
        }

        function loadAllEvents() {
            return $http({method: 'GET', url: '/calendarevent/all'});
        }

        function createEvent(event) {
            return $http({method: 'POST', url: '/calendarevent/create', data: event });
        }

        function updateEvent(event) {
            return $http({method: 'PATCH', url: '/calendarevent/update/' + event.id, data: event});
        }

        function deleteEvent(id){
            return $http({method: 'DELETE', url: '/calendarevent/delete/' + id });
        }

        function createDraggableEvent(event) {
            return $http({method: 'POST', url: '/calendarevent/draggable/', data: event });
        }

        function loadDraggableEvents() {
            return $http({method: 'GET', url: '/calendarevent/draggable'});
        }

        function deleteDraggableEvent(id){
            return $http({method: 'DELETE', url: '/calendarevent/draggable/' + id });
        }
        
    }
})();