var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose');
var { ObjectID } = require('mongodb');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

//Set up production
const port = process.env.PORT || 3000;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then(
		doc => {
			res.send(doc);
		},
		e => {
			res.status(400).send(e);
		}
	);
});

app.get('/todos', (req, res) => {
	Todo.find().then(
		todos => {
			res.send({ todos });
		},
		e => {
			res.status(400).send(e);
		}
	);
});

app.get('/todos/:id', (req, res) => {
	const id = req.params.id;
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
	Todo.findById(id)
		.then(todo => {
			if (!todo) {
				return res.status(404).send();
			}
			res.send({ todo });
		})
		.catch(e => res.status(404).send());
});

//app.post('/sum', (req, res) => {
//  var num = req.body;
//  var result = num.num1 + num.num2;
//  res.send({result});
//});

app.listen(port, () => console.log(`Listening at port ${port}`));

module.exports = { app };