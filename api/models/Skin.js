/**
* Skin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    
      attributes: {

        skinId: {
            type:'integer',
            required: true
        },
          
        body: {
            type:'string',
            required: true
        },

        box: {
            type:'string',
            required: true
        },

        tab: {
            type:'string',
            required: true
        },

        toogle: {
            type:'string',
            required: true
        },

        slider: {
            type:'string',
            required: true
        }  
    
      }
    };