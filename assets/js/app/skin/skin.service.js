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
        .factory('skinService', skinService);

    skinService.$inject = ['$http'];

    function skinService($http) {
        
        var service = {
            get: get 
        };

        return service;

        function get(id){
            return $http({method: 'GET', url: '/skin/' + id});
        }
        
    }
})();