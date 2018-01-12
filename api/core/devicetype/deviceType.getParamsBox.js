var queries = require('./deviceType.queries.js');
var Promise = require('bluebird');
var boxParams;
var dataParams = new Object();

module.exports = function(id) {

    if (!id) {
        return Promise.reject(new Error('Wrong parameters'));
    }

    return gladys.box.getById([id])
    .then((box) => {

        if (box.length === 0) {
            return Promise.reject(new Error('Box not found'));
        }else if(!box[0].param){
            return Promise.reject();
        }

        boxParams = JSON.parse(box[0].param);
        dataParams.view = boxParams.view;
        dataParams.params = boxParams;
        dataParams.devices = new Array()

        return Promise.map(boxParams.devices, function(deviceType){
    
            var device = {
                id: deviceType.id
            }

            return getSelectedDeviceType(device)
            .then((devicetype) => {
                var device = JSON.parse(JSON.stringify(devicetype))
                device.name = deviceType.name
                dataParams.devices.push(device)
            })
        })
        .then(() => {
            if(boxParams.chart && boxParams.chart != null){
                return getChartDeviceStates(boxParams)
                .then((deviceState) => {
                    dataParams.chart = deviceState
                })
            }
            return;
        })
        .then(() => {
            return dataParams;
        })

    })
};

function getSelectedDeviceType(device){

    return gladys.deviceType.getById(device)
    .then((data) => {
        return data;
    })
    .catch()
}

function getChartDeviceStates(boxParams){

    var options = {
        take: 5,
        devicetype: boxParams.chart.id
    }

    return gladys.deviceState.get(options)
    .then((data) => {
        return data;
    })
}