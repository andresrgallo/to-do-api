const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TodoSchema = new Schema({
	text: { type: String, required: true, minlength: 5, trim: true },
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: { type: Date, default: null },
	completed: { type: Boolean, default: false },
	completedAt: { type: Date, default: null }
});

let todoModel = mongoose.model('Todo', TodoSchema);

module.exports = { todoModel };
