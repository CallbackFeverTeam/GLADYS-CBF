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
        .controller('ModeBoxCtrl', ModeBoxCtrl);

    ModeBoxCtrl.$inject = ['modeService', 'houseService', 'notificationService'];

    function ModeBoxCtrl(modeService, houseService, notificationService) {
        /* jshint validthis: true */
        var vm = this;
        
        vm.modes = [];
    	vm.createMode = createMode;
        vm.destroyMode = destroyMode;
        vm.changeMode = changeMode;
        
        activate();

        function activate() {
            getModes();
            getHouses()
            $('.select2').select2().val(2)
            return ;
        }
        
        function getModes(){
            return modeService.get()
              .then(function(data){
                  vm.modes = data.data;
              });
        }

        function getHouses(){
            return houseService.get()
                .then(function(data){
                    vm.houses = data.data;
                });
        }
        
        function createMode(mode){
            return modeService.create(mode)
              .then(function(data){
                  vm.modes.push(data.data);
              });
        }
        
        function destroyMode(index, modeId){
            return modeService.destroy(modeId)
              .then(function(){
                  vm.modes.splice(index, 1);
              });
        }

        function changeMode(){
            
            var code = $('#selectMode').val()
            var house = $('#selectHouse').val()

            return modeService.changeMode(house, code)
            .then(function(){
                notificationService.successNotificationTranslated('MODE.CHANGE_SUCCESS_NOTIFICATION');
            })
            .catch(function(){
                notificationService.errorNotificationTranslated('MODE.CHANGE_FAIL_NOTIFICATION');
            })
        }
    }
})();
