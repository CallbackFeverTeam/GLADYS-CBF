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

         var vm = this;
         vm.changeSkin = changeSkin;
 
         vm.skins = []
            
         activate();
          
         function activate() {
            skinService.get()
            .then(function(data){
                vm.skins = data.data;
            });
             return; 
         }

         function changeSkin(){
            var id = $("#skin-dropdown").val()
             skinService.getBySkinId(id)
             .then(function(newSkin){

                 $("#body").removeClass (function (index, className) {
                    return (className.match (/(^|\s)skin-\S+/g) || []).join(' ');
                }).addClass(newSkin.data.body);
                $(".skin-box").removeClass (function (index, className) {
                    return (className.match (/(^|\s)box-\S+/g) || []).join(' ');
                }).addClass(newSkin.data.box);
                $(".nav-tabs-custom").removeClass (function (index, className) {
                    return (className.match (/(^|\s)nav-tabs-custom-\S+/g) || []).join(' ');
                }).addClass(newSkin.data.tab);

             })
         }
         
     }
 })(); 