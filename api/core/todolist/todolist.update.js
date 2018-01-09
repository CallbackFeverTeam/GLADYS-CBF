var Promise = require('bluebird');

module.exports = function update(task) {
    var id = task.id;
    delete task.id;
    return TodoList.update({
            id: id
        }, task)
        .then(function(tasks) {
            if (tasks.length === 0) {
                return Promise.reject(new Error('Task not found'));
            } else {
                return Promise.resolve(tasks[0]);
            }
        });
};