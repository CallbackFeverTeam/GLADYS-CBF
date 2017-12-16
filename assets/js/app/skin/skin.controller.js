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
 
     SkinCtrl.$inject = ['skinService', 'userService'];
 
     function SkinCtrl(skinService, userService) {
         /* jshint validthis: true */
         var vm = this;
         vm.getSkins = getSkins;
 
         vm.skins = []
         vm.users = [];
 
         activate();
 
         function activate() {
             getUsers();
             return; 
         }

         function getUsers(){
            userService.get()
               .then(function(data){
                 vm.users = data.data;
                 getSkins(vm.users);
               });
          }
         
         function getSkins(user) {
             return skinService.get(user[0].activeSkin)
                 .then(function(data){
                     vm.skins = data.data;
                 });
         }
         
     }
 })(); 