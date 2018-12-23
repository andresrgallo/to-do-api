const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [
	{
		_id: new ObjectID(),
		text: 'first test todo'
	},
	{
		_id: new ObjectID(),
		text: 'second test todo'
	}
];

beforeEach(done => {
	Todo.remove({})
		.then(() => {
			return Todo.insertMany(todos);
		})
		.then(() => done());
});

describe('POST /todos', () => {
	it('should create a new todo', done => {
		var text = 'Test todo text';

		request(app)
			.post('/todos')
			.send({ text })
			.expect(200)
			.expect(res => {
				expect(res.body.text).toBe(text);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find()
					.then(todos => {
						expect(todos.length).toBe(3);
						expect(todos[2].text).toBe(text);
						done();
					})
					.catch(e => done(e));
			});
	});

	it('should not create todo with invalid body data', done => {
		request(app)
			.post('/todos')
			.send({})
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				Todo.find()
					.then(todos => {
						expect(todos.length).toBe(2);
						done();
					})
					.catch(e => done(e));
			});
	});

	it('Shows a list of todos', done => {
		request(app)
			.get('/todos')
			.expect(200)
			.expect(res => {
				expect(res.body.todos.length).toBe(2);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('Shows a todo document', done => {
		request(app)
			.get(`/todos/${todos[0]._id.toHexString()}`)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(todos[0].text);
			})
			.end(done);
	});
	it('Returns 404 if not found', done => {
		var id = new ObjectID();
		request(app)
			.get(`/todos/${id.toHexString()}`)
			.expect(404)
			.end(done);
	});
	it('Returns 404 for not valid ids', done => {
		request(app)
			.get(`/todos/s23`)
			.expect(404)
			.end(done);
	});
});

describe('delete /todos/id route', () => {
	it('Deletes a todo given an existent id', done => {
		const id = todos[0]._id.toHexString();
		request(app)
			.delete(`/todos/${id}`)
			.expect(200)
			.expect(res => {
				expect(res.body._id).toBe(id);
			})
			.end((err, res) => {
				if (err) {
					return done(err);
				}
				Todo.findById(id)
					.then(res => {
						expect(res).toBeFalsy();
						done();
					})
					.catch(e => done(e));
			});
	});
	it('Sends a 404 if the id is not valid', done => {
		const id = 123;
		request(app)
			.delete(`/todos/${id}`)
			.expect(404)
			.end(done);
	});
	it('Sends a 404 if the id does not exist', done => {
		const id = new ObjectID();
		request(app)
			.delete(`/todos/${id}`)
			.expect(404)
			.end(done);
	});
});
