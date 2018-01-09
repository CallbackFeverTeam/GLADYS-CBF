/**
* Box.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
      
      boxtype: {
          model:'BoxType',
          required: true
      },
      
      x: {
          type: 'integer',
          required: true
      },
      
      y: {
          type: 'integer',
          required: true
      },

      param: {
          type: 'text'
      },
      
      user: {
          model: 'User',
          required: true
      },
      
      active: {
           type: 'boolean',
           defaultsTo: true
      },

  }
};

