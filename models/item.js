const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item: String,
    completed: Boolean
});


const Todolist = mongoose.model("Todolist", itemSchema);

module.exports = Todolist;