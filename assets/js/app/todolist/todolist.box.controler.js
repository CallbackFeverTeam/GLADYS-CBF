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
        .controller('TodolistBoxCtrl', TodolistBoxCtrl);

    TodolistBoxCtrl.$inject = ['todolistService'];

    function TodolistBoxCtrl(todolistService) {
        /* jshint validthis: true */
        var vm = this;
        vm.getTasks = getTasks;
        vm.todolistView = todolistView;
        vm.createTask = createTask;
        vm.destroyTask = destroyTask;
        vm.editTask = editTask; 
        vm.updateTask = updateTask;
        vm.tasks = []
        vm.taskUpdated = {}
        
        
        activate();

        function activate() {
            getTasks()
            todolistView()
            return;
        }

        function getTasks(){
            return todolistService.getByUser()
            .then(function(tasks){
                vm.tasks = tasks.data
                for(var i = 0; i < vm.tasks.length; i++ ){
                    if(vm.tasks[i].checked === "done"){
                        vm.tasks[i].checkbox = "true"
                    }
                }
            })
        }

        function todolistView(){

            $('.todo-list').sortable({
                placeholder         : 'sort-highlight',
                handle              : '.handle',
                forcePlaceholderSize: true,
                zIndex              : 999999,
                update: function(event, ui){
                    var id = ui.item.attr('rel')
                    vm.taskUpdated.position = ui.item.index()
                    todolistService.update(id, vm.taskUpdated)
                    console.log(ui.item.attr('rel'))
                    console.log(ui.item.index())
                }
            })
            .todoList({
                onCheck  : function () {
                    var id = $(this).attr("rel")
                    vm.taskUpdated.checked = "done"
                    todolistService.update(id, vm.taskUpdated)
                },
                onUnCheck: function () {
                    var id = $(this).attr("rel")
                    vm.taskUpdated.checked = ""
                    todolistService.update(id, vm.taskUpdated)
                }
            });

        }

        function createTask(){

            var task = {
                title: $('#newTaskTitle').val(),
                position: vm.tasks.length + 1,
                checked: ""
            }

            todolistService.create(task)
            .then(function(task){
                vm.tasks.push(task.data)
                $('#newTaskTitle').val("")
            })
        }

        function destroyTask(id){
            todolistService.destroy(id)
            .then(function(){
                getTasks()
            })            
        }

        function editTask(id, title){

            vm.taskUpdated.id = id
            vm.taskUpdated.title = title    

            $('#newTaskTitle').val(title)
            $('#createTaskButton').css('display', 'none')
            $('#editTaskButton').css('display', 'inline-block')

        }

        function updateTask(){
            vm.taskUpdated.title = $('#newTaskTitle').val()
            todolistService.update(vm.taskUpdated.id, vm.taskUpdated)
            .then(function(){
                resetFields()
                getTasks()
            }) 
        }

        function resetFields(){
            $('#newTaskTitle').val("")
            $('#createTaskButton').css('display', 'inline-block')
            $('#editTaskButton').css('display', 'none')
        }
        
    }
})();
