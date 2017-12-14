/** 
 * Gladys Project
 * http://gladysproject.com
 * Software under licence Creative Commons 3.0 France 
 * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
 * You may not use this software for commercial purposes.
 * @author :: Pierre-Gilles Leymarie
 */

/**
 * CalendarDraggableEvents.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {
    
        attributes: {
    
            title: {
                type: 'string'
            },
    
            color: {
                type: 'string',
                defaultsTo: 'rgb(0, 115, 183)'
            },
    
            user: {
                type: 'integer',
                required: true
            }
    
        }
    };
    