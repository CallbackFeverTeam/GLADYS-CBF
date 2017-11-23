/**
* Skin.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
    
      attributes: {
          
        header: {
            type:'string',
            required: true,
            defaultsTo:'skin-blue-light'
        },

        box: {
            type:'string',
            required: true,
            defaultsTo:'box-primary'
        },

        tabs: {
            type:'string',
            required: true,
            defaultsTo:'nav-tabs-custom-primary'
        },

        toogle: {
            type:'string',
            required: true,
            defaultsTo:'toogle-primary'
        },

        slider: {
            type:'string',
            required: true,
            defaultsTo:'blue'
        },  
    
      }
    };