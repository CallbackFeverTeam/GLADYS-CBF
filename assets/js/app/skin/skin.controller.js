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
        .controller('SkinCtrl', SkinCtrl);

    SkinCtrl.$inject = ['skinService', '$scope'];

    function SkinCtrl(skinService, $scope) {
        /* jshint validthis: true */
        var vm = this;
        vm.getSkins = getSkins;

        vm.skins = []

        activate();

        function activate() {
            return getSkins();
        }
        
        function getSkins() {
            return skinService.get()
                .then(function(data){
                    vm.skins = data.data;
                });
        }
        
    }
})();