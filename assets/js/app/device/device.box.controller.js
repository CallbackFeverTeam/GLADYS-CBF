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
        .controller('DeviceBoxCtrl', DeviceBoxCtrl);

    DeviceBoxCtrl.$inject = ['deviceService', 'boxService', '$scope'];

    function DeviceBoxCtrl(deviceService, boxService, $scope) {
        /* jshint validthis: true */
        var vm = this;
        vm.getStatesDevice = getStatesDevice;
        vm.selectDeviceTypes = selectDeviceTypes;
        vm.changeValue = changeValue;
        vm.deleteDeviceType = deleteDeviceType;
        vm.previousStates = previousStates;
        vm.updateBoxParams = updateBoxParams;
        vm.nextStates = nextStates;
        vm.init = init;
        vm.deviceTypes= []
        vm.selectedDeviceTypes = [];
        vm.currentDeviceType;
        vm.options;
        vm.boxParams = {};

        function init(boxId){
            vm.boxId = boxId;
            getDeviceTypes();
            initParams(vm.boxId)
            activate();
        }

        function initParams(id){
            return deviceService.getBoxParams(id)
            .then(function(data){
                var params = data.data
                vm.boxParams = params.params

                if(params.chart){
                    var chartData = formatDataChartjs(params.chart);                
                    chartData.series = [vm.boxParams.chart.name + ' ' + vm.boxParams.chart.unit];
                    chartData.data = [chartData.data];
                    vm.chart = chartData;
                    vm.currentDeviceType = vm.boxParams.chart;
                    vm.currentDeviceType.skip = 0;
                }

                vm.selectedDeviceTypes = params.devices

                for(var i = 0; i < vm.deviceTypes.length; i++){
                    for(var j = 0; j < vm.boxParams.devices.length; j++){
                        if(vm.boxParams.devices[j].id == vm.deviceTypes[i].id){
                            vm.deviceTypes[i].selected = true
                        }
                    }
                }
            })
        }

        function activate() {
            vm.boxParams.devices = new Array()

            vm.options = {
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            callback: function(dataLabel, index) {
                                // Hide the label of every 2nd dataset. return null to hide the grid line too
                                return index % 2 === 0 ? dataLabel : '';
                            }
                        }
                    }]
                },
                legend: {
                    display: true,
                    onClick: null
                }
            }
            waitForNewValue();
            return ;
        }

        function getDeviceTypes(){
            return deviceService.getTypes()
            .then(function(data){
                vm.deviceTypes = data.data;
            });
        }

        function updateBoxParams(){
            var box = {
                param: JSON.stringify(vm.boxParams)
            }

            return boxService.update(vm.boxId, box)
        }

        function selectDeviceTypes(index, devicetype){

            return deviceService.getTypesById(devicetype.id)
            .then(function(data){
                data.data.name = devicetype.name

                if(vm.selectedDeviceTypes.length < 5){
                    vm.selectedDeviceTypes.push(data.data)

                    var device = {
                        id: data.data.id,
                        name: data.data.name
                    }
                    vm.boxParams.devices.push(device);
                    updateBoxParams()
                }else{$('#deviceBoxModal').modal('show')}

                vm.deviceTypes[index].selected = true;
            })
        }

        function changeValue(deviceType, value){
            return deviceService.exec(deviceType, value)
            .then(function(data){
                deviceType.lastValue = data.data.value; 
            });
        }

        function deleteDeviceType(index){
            vm.selectedDeviceTypes.splice(index, 1);
            vm.deviceTypes[index].selected = false;
            vm.boxParams.devices.splice(index, 1);
            updateBoxParams()
        }

        // waiting for websocket message
        function waitForNewValue(){

            io.socket.on('newDeviceState', function (deviceState) {

                // if the device is the current device, push the value in the graph
                if(vm.currentDeviceType && deviceState.devicetype == vm.currentDeviceType.id){
                    $scope.$apply(function(){
                        vm.chart.labels.push();
                        vm.chart.data[0].push(deviceState.value);  
                    });
                }
            });
        }

        function previousStates(){
            vm.currentDeviceType.skip += 5;
            refreshChart();   
        }

        function nextStates(){
            vm.currentDeviceType.skip -= 5;
            if(vm.currentDeviceType.skip < 0){
                vm.currentDeviceType.skip = 0;
            }
            refreshChart();   
        }

        function refreshChart(){
            if(vm.currentDeviceType && vm.currentDeviceType.id){
                getStatesDevice(vm.currentDeviceType);   
            }  
        }

        function getStatesDevice(deviceType){
            if(!deviceType.take){
                deviceType.take = 5;
            }  
            if(!deviceType.skip){
                deviceType.skip = 0;
            }
            return deviceService.getStates(deviceType.id, deviceType.skip, deviceType.take)
            .then(function(data){
                if(data.data.length > 0 || vm.currentDeviceType.id != deviceType.id){

                    var chartData = formatDataChartjs(data.data);                
                    chartData.series = [deviceType.name + ' ' + deviceType.unit];
                    chartData.data = [chartData.data];
                    vm.chart = chartData;

                }else{
                    vm.currentDeviceType.skip -= 5;
                    if(vm.currentDeviceType.skip < 0){
                        vm.currentDeviceType.skip = 0;
                    }
                }

                vm.currentDeviceType = deviceType

                var device = {
                    id: deviceType.id,
                    name: deviceType.name,
                    unit: deviceType.unit
                }

                vm.boxParams.chart = device;
                updateBoxParams()
            });
        }

        function formatDataChartjs(rows){
            var labels = [];
            var data = [];
            rows.forEach(function(row){
                labels.unshift(row.dateFormat);
                data.unshift(row.value);
            });
            return {labels: labels, data:data};
        }

    }
})();