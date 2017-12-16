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
    .controller('calendarCtrl', calendarCtrl);

  calendarCtrl.$inject = ['calendarService', 'userService'];

  function calendarCtrl(calendarService, userService) {
    /* jshint validthis: true */
    var vm = this;
    var externalId = ""
    vm.calendar = [];
    vm.dayEvents = [];
    vm.allEvents = [];
    vm.draggableEvents = [];
    vm.calendarView = calendarView;
    vm.loadEvents = loadEvents;
    vm.loadAllEvents = loadAllEvents;
    vm.loadDraggableEvents = loadDraggableEvents;
    vm.init_events = init_events;
    vm.createDraggableEvent = createDraggableEvent;
    vm.deleteDraggableEvent = deleteDraggableEvent;

    activate();

    function activate() {
      getCurrentUser()
      .then(function(user){
        getCalendar(user);
        calendarView(user);
        loadAllEvents();
        loadDraggableEvents();
      });
      return;
    }

    function getCurrentUser(){
      return userService.whoAmI()
        .then(function(userData){
          var user = []
          user.language = userData.language.substring(0,2).toLowerCase();
          user.id = userData.id;
          user.firstname = userData.firstname;
          user.lastname = userData.lastname
          return user;
        }); 
    }

    function getCalendar(user){
      calendarService.getCalendarByServiceAndUser("gladys", user.id)
      .then(function(data){
        vm.calendar = data.data
      })
      .catch(function(err){
        makeid()

        var calendar = {
          externalid: "gladys_calendar_" + externalId,
          name: user.firstname + " " + user.lastname,
          service: "gladys",
          user: user.id
        }

        calendarService.createCalendar(calendar)
        .then(function(data){
          vm.calendar = data.data[0]
        })
      })
    }

    function calendarView(user) {

      $("#calendar").fullCalendar({
        header    : {
          left  : 'prev,next today',
          center: 'title',
          right : 'month,agendaWeek,agendaDay,listWeek'
        },
        locale: user.language,
        allDaySlot: false,
        allDayDefault: false,
        timezone: 'local',
        dragRevertDuration: 0,
        eventLimit: true,
        editable: true,
        droppable: true,
        drop      : function (date, allDay) {

          var originalEventObject = $(this).data('eventObject')
          var copiedEventObject = $.extend({}, originalEventObject)

          var eventDate = new Date(date.format())
          if(eventDate.getHours() == 0){
            eventDate.setHours(8)
          }

          makeid()

          var event = {
            externalid: "gladys_calendar_" + externalId,
            name: originalEventObject.title,
            start: eventDate,
            calendar: vm.calendar.id,
            user: user.id,
            color: $(this).css('background-color')
          }

          calendarService.createEvent(event)
          .then(function(data){
            copiedEventObject.externalid      = data.data.externalid
            copiedEventObject.id              = data.data.id
            copiedEventObject.start           = eventDate
            copiedEventObject.backgroundColor = $(this).css('background-color')
            copiedEventObject.borderColor     = $(this).css('border-color')
    
            $('#calendar').fullCalendar('renderEvent', copiedEventObject, true)
          })

        },
        eventDragStop: function(event, jsEvent, ui, view){
          if(isEventOverDiv(jsEvent.clientX, jsEvent.clientY)) {
            $('#calendar').fullCalendar('removeEvents', event._id);
            calendarService.deleteEvent(event.id)
          }
        },
        eventResize: function(event, jsEvent, ui, view){

          makeid()

          var updateEvent = {
            id: event.id,
            externalid: "gladys_calendar_" + externalId,
            name: event.title,
            start: event.start._d,
            end: event.end._d,
            calendar: vm.calendar.id,
            user: user.id,
            color: event.color
          }

          calendarService.updateEvent(updateEvent)

        },
        eventDrop: function(event, delta, revertFunc, jsEvent, ui, view ){

          var endEvent

          makeid()

          if("end" in event && event.end != null){
            endEvent = event.end._d
          }else{endEvent = null}

          var updateEvent = {
            id: event.id,
            externalid: "gladys_calendar_" + externalId,
            name: event.title,
            start: event.start._d,
            end: endEvent,
            calendar: vm.calendar.id,
            user: user.id,
            color: event.color
          }

          calendarService.updateEvent(updateEvent)
        }

      })
      
      var colorButton = 'rgb(0, 115, 183)'
      
      $('#color-chooser > li > a').click(function (e) {
        colorButton = $(this).css('color')
        $('#add-new-event').css({ 'background-color': colorButton, 'border-color': colorButton })
      })

      $('#add-new-event').click(function (e) {
        var val = $('#new-event').val()
        if (val.length == 0) {
          return
    }
    
        var newEvent = {
          title: val,
          color: colorButton,
          user: user.id
        }

        createDraggableEvent(newEvent)
        .then(function(id){
          
          var event = $('<div />')
          
          event.css({
            'color'           : '#fff',
            'background-color': colorButton,
            'border-color'    : colorButton,
          }).addClass('external-event')
            .attr('id', id) 
          event.html(val)
          $('#external-events').prepend(event)
          
          init_events(event)
        })
       
        $('#new-event').val('')

      })

      $("#trash").droppable({
        drop: function(event, ui) {
          deleteDraggableEvent(ui.draggable.attr("id"))
          .then(function(){
            ui.draggable.remove()
          })
        }
      });

    }

    function init_events(event) {
      event.each(function () {
        
        var eventObject = {
          title: $.trim($(this).text()),
          stick: true
        }
        
        $(this).data('eventObject', eventObject)
        
        $(this).draggable({
          zIndex        : 999,
          revert        : true,
          revertDuration: 0
        })

      })
    }
    
    function loadEvents(date) {
      return calendarService.loadEvents(date)
        .then(function(data){
          vm.dayEvents = data.data;
        });
    }

    function loadAllEvents() {
      return calendarService.loadAllEvents()
        .then(function(data){
          vm.allEvents = data.data;

          var events = []

          for(var i = 0; i < vm.allEvents.length; i++ ){

            var event = {
              id: vm.allEvents[i].id,
              title: vm.allEvents[i].name,
              start: vm.allEvents[i].start,
              end: vm.allEvents[i].end,
              allDay: vm.allEvents[i].fullday,
              color: vm.allEvents[i].color
            }

            events.push(event)

          }
          $('#calendar').fullCalendar('addEventSource', events)

        });
    }

    function loadDraggableEvents() {
      return calendarService.loadDraggableEvents()
        .then(function(data){
          vm.draggableEvents = data.data;
          
          for(var i = 0; i < vm.draggableEvents.length; i++){

            var event = $('<div />')

            event.css({
              'color'           : '#fff',
              'background-color': vm.draggableEvents[i].color,
              'border-color'    : vm.draggableEvents[i].color,
            }).addClass('external-event')
              .attr('id', vm.draggableEvents[i].id)
            event.html(vm.draggableEvents[i].title)

            $('#external-events').prepend(event)

            init_events(event)
          }

        });
    }

    function createDraggableEvent(event){
      return calendarService.createDraggableEvent(event)
      .then(function(data){
        var id = data.data.id
        return id
      })
    }

    function deleteDraggableEvent(id){
      return calendarService.deleteDraggableEvent(id)
    }

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 15; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      externalId = text;
    }

    function isEventOverDiv(x, y){

      var external_events = $( '#trash' );
      var offset = external_events.offset();
      offset.right = external_events.width() + offset.left;
      offset.bottom = external_events.height() + offset.top;

      if (x >= offset.left && y >= offset.top && x <= offset.right && y <= offset .bottom) { 
        return true; 
      }
      return false;
    }
  }
})();