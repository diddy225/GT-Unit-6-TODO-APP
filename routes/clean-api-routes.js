const RestfulAPI = require('./RestClass');
const models = require('../models');

module.exports = function (app) {
  
  const task = new RestfulAPI('list', app, db.ToDolist);
  task.findAll();
  task.find('id');
  task.create();
  task.taskComplete('id', app, db.ToDolist);
  task.delete('id');
}