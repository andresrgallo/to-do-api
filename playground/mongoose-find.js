const { mongoose } = require('./../server/db/mongoose.js');
const { Todo } = require('./../server/models/todo.js');

const id = '4c1731bf7c7e312e2b246c73';

Todo.find({ _id: id }).then(Todos => {
	console.log('find and pass object', Todos);
});
Todo.findOne({ _id: id }).then(Todo => {
	console.log('find one', Todo);
});
Todo.find().then(Todos => console.log('all todos', Todos));

Todo.findById(id).then(Todo => {
	if (!Todo) {
		console.log('Todo not found');
	} else {
		console.log('by id', Todo);
	}
});
