const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    item: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});


const Todolist = mongoose.model("Todolist", itemSchema);

module.exports = Todolist;