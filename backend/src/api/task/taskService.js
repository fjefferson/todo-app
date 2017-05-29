const Task = require('./task');

Task.methods(['get', 'post', 'put', 'delete']);
Task.updateOptions({new: true, runValidator: true});

module.exports = Task;