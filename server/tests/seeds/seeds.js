const { todoModel } = require('./../../app/models/todo');
const { ObjectID } = require('mongodb');

const todos = [
	{
		_id: new ObjectID(),
		text: 'first test todo'
	},
	{
		_id: new ObjectID(),
		text: 'second test todo',
		completed: true,
		completedAt: 333
	}
];

const populateTodos = done => {
	todoModel
		.remove({})
		.then(() => {
			return todoModel.insertMany(todos);
		})
		.then(() => done());
};

module.exports = { todos, populateTodos };
