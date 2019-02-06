const { todoModel } = require('./../../app/models/todo');
const { userModel } = require('./../../app/models/user');
const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const todos = [
	{
		_id: new ObjectID(),
		text: 'first test todo',
		userId: userOneId
	},
	{
		_id: new ObjectID(),
		text: 'second test todo',
		userId: userTwoId,
		completed: true,
		completedAt: 333
	}
];

let expiration_time = parseInt(process.env.JWT_EXPIRATION);

const users = [
	{
		_id: userOneId,
		name: 'Carlos',
		email: 'car@sam.com',
		password: 'password',
		token: jwt.sign({ id: userOneId }, process.env.JWT_SECRET, {
			expiresIn: expiration_time
		})
	},
	{ _id: userTwoId, name: 'Jose', email: 'jose@sam.com', password: 'password' }
];

const populateTodos = done => {
	todoModel
		.remove({})
		.then(() => {
			return todoModel.insertMany(todos);
		})
		.then(() => done());
};

const populateUsers = done => {
	userModel
		.remove({})
		.then(() => {
			const userOne = new userModel(users[0]).save();
			const userTwo = new userModel(users[1]).save();
			return Promise.all([userOne, userTwo]);
		})
		.then(() => done());
};

module.exports = { todos, populateTodos, users, populateUsers };
