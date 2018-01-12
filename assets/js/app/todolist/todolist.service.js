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
        .factory('todolistService', todolistService);

    todolistService.$inject = ['$http'];

    function todolistService($http) {
        
        var service = {
            create: create,
            getByUser: getByUser,
            destroy: destroy,
            update: update
        };

        return service;

        function create(task) {
            return $http({method: 'POST', url: '/todolist/task/', data: task });
        }
        
        function destroy(id) {
            return $http({method: 'DELETE', url: '/todolist/task/' + id });
        }
        
        function getByUser() {
            return $http({method: 'GET', url: '/todolist/task' });
        }
        
        function update(id, task) {
            return $http({method: 'PATCH', url: '/todolist/task/' + id, data: task });
        }

    }
})();