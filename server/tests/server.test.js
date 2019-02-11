const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');
const { app } = require('./../server');
const { todoModel } = require('./../app/models/todo');
const { userModel } = require('./../app/models/user');
const { todos, populateTodos, users, populateUsers } = require('./seeds/seeds');
const qs = require('qs');

beforeEach(populateUsers);
beforeEach(populateTodos);

describe('POST /todos', () => {
	const text = 'Creating a new one';
	it('should create a new todo', done => {
		request(app)
			.post('/todos')
			.set('x-access-token', users[0].token)
			.send(qs.stringify({ text: text, userId: users[0]._id }))
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(`${text}`);
			})
			.end((err, res) => {
				if (err) return done(err);

				todoModel
					.find()
					.then(todos => {
						expect(todos.length).toBe(3);
						expect(todos[2].text).toBe(`${text}`);
						done();
					})
					.catch(e => done(e));
			});
	});

	it('should not create todo with invalid body data', done => {
		request(app)
			.post('/todos')
			.set('x-access-token', users[0].token)
			.send('text=')
			.expect(400)
			.end((err, res) => {
				if (err) {
					return done(err);
				}

				todoModel
					.find()
					.then(todos => {
						expect(todos.length).toBe(2);
						done();
					})
					.catch(e => done(e));
			});
	});
});

describe('Get /todos', () => {
	it('Shows a list of todos', done => {
		request(app)
			.get('/todos')
			.set('x-access-token', users[0].token)
			.expect(200)
			.expect(res => {
				expect(res.body.todos.length).toBe(1);
			})
			.end(done);
	});
});

describe('GET /todos/:id', () => {
	it('Shows a todo document', done => {
		request(app)
			.get(`/todos/${todos[1]._id.toHexString()}`)
			.set('x-access-token', users[0].token)
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(todos[1].text);
			})
			.end(done);
	});
	it('Returns 404 if not found', done => {
		var id = new ObjectID();
		request(app)
			.get(`/todos/${id.toHexString()}`)
			.set('x-access-token', users[0].token)
			.expect(404)
			.end(done);
	});
	it('Returns 404 for not valid ids', done => {
		request(app)
			.get(`/todos/s23`)
			.set('x-access-token', users[0].token)
			.expect(404)
			.end(done);
	});
});

describe('delete /todos/id route', () => {
	it('Deletes a todo given an existent id', done => {
		const id = todos[0]._id.toHexString();
		request(app)
			.delete(`/todos/${id}`)
			.set('x-access-token', users[0].token)
			.expect(200)
			.expect(res => {
				expect(res.body.todo._id).toBe(id);
			})
			.end(err => {
				if (err) {
					return done(err);
				}
				todoModel
					.findById(id)
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
			.set('x-access-token', users[0].token)
			.expect(404)
			.end(done);
	});
	it('Sends a 404 if the id does not exist', done => {
		const id = new ObjectID();
		request(app)
			.delete(`/todos/${id}`)
			.set('x-access-token', users[0].token)
			.expect(404)
			.end(done);
	});
});

describe('PATCH /todos', () => {
	it('should update the todo', done => {
		const text = 'Updating new text';

		request(app)
			.patch(`/todos/${todos[0]._id.toHexString()}`)
			.set('x-access-token', users[0].token)
			.send(`text=${text}`)
			.send('completed=true')
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(true);
				expect(res.body.todo.completedAt).not.toBeNaN();
			})
			.end(done);
	});
	it('should not have a completed at date when todo completed set to false', done => {
		const text = 'Updating another text';
		const hexId = todos[0]._id.toHexString();

		request(app)
			.patch(`/todos/${hexId}`)
			.set('x-access-token', users[0].token)
			.send(qs.stringify({ text: text }))
			.send('completed=false')
			.expect(200)
			.expect(res => {
				expect(res.body.todo.text).toBe(text);
				expect(res.body.todo.completed).toBe(false);
				expect(res.body.todo.completedAt).toBeFalsy();
			})
			.end(done);
	});
});
describe('POST users/register', () => {
	it('should register a user', done => {
		const name = 'alex';
		const email = 'alex@sam.com';
		const password = 'password';
		request(app)
			.post('/users/register')
			.send(qs.stringify({ name, email, password }))
			.expect(200)
			.expect(res => {
				expect(res.body.data.result.name).toBe(`${name}`);
			})
			.end((err, res) => {
				if (err) return done(err);

				userModel
					.find()
					.then(users => {
						expect(users.length).toBe(3);
						expect(users[2].email).toBe(`${email}`);
						done();
					})
					.catch(e => done(e));
			});
	});
	it('should return 400 when email account already exists', done => {
		const name = 'Carlos';
		const email = 'car@sam.com';
		const password = 'password';
		request(app)
			.post('/users/register')
			.send(qs.stringify({ name, email, password }))
			.expect(400)
			.end(done);
	});
});
describe('POST users/login', () => {
	it('Should login a registered user', done => {
		const name = users[0].name;
		const email = users[0].email;
		const password = users[0].password;

		request(app)
			.post('/users/login')
			.send(qs.stringify({ name, email, password }))
			.expect(200)
			.expect(res => expect(res.body.data.user.name).toBe('Carlos'))
			.expect(res => expect(res.body.data.token).toBeTruthy())
			.end(done);
	});
});
