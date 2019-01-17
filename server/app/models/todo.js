const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: { type: String, required: true, minlength: 5, trim: true },
	completed: { type: Boolean, default: false },
	completedAt: { type: Number, default: null }
});

let todoModel = mongoose.model('Todo', TodoSchema);

module.exports = { todoModel };
