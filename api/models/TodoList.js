/**
* TodoList.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

    attributes: {
        
        title: {
            type: 'string',
            required: true
        },
  
        position: {
            type: 'integer',
            required: true
        },

        checked: {
            type:'string',
            enum: ['done', ''],
            defaultsTo: '',
        },

        user: {
            type: 'integer',
            required: true
        }
    }
  };
  
  