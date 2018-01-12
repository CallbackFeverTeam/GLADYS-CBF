/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
  
  module.exports = {

    /**
     * Get tasks user
     */
    getByUser: function(req, res, next) {

        var id = req.session.User.id;
        if(req.params.id){
            id = req.params.id;
        }

        gladys.todolist.getByUser(id)
        .then((task) => res.json(task))
        .catch(next);
    },

    /**
     * Create a task
     */
    create: function(req, res, next) {
        var task = req.body
        task.user = req.session.User.id
        gladys.todolist.create(task)
            .then(function(task) {
                return res.json(task);
            })
            .catch(next);
    },

    /**
     * Update a task
     */
    update: function(req, res, next) {
        req.body.id = req.params.id;
        gladys.todolist.update(req.body)
            .then(function(task) {
                return res.json(task);
            })
            .catch(next);
    },

    /**
     * Delete a task
     */
    delete: function(req, res, next) {
        gladys.todolist.delete({id: req.params.id})
            .then(function(task) {
                return res.json(task);
            })
            .catch(next);
    },

};