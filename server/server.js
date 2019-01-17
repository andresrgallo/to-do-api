require('dotenv').config();

require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
const logger = require('morgan');

const { mongoose } = require('./db/mongoose');
const todos = require('./routes/todos');
const users = require('./routes/users');

const app = express();
const port = process.env.PORT;

// connection to mongodb
mongoose.connection.on(
	'error',
	console.error.bind(console, 'MongoDB connection error:')
);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
	res.json({ Welcome: 'TODO RESTFUL application' });
});

// public route
app.use('/users', users);

// private route
app.use('/todos', /*validateUser,*/ todos);

app.get('/favicon.ico', function(req, res) {
	res.sendStatus(204);
});

function validateUser(req, res, next) {
	jwt.verify(req.headers['x-access-token'], process.env.JWT_SECRET, function(
		err,
		decoded
	) {
		if (err) {
			res.json({ status: 'error', message: err.message, data: null });
		} else {
			// add user id to request
			req.body.userId = decoded.id;
			next();
		}
	});
}

//handle 404 error
app.use(function(req, res, next) {
	let err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// // handle errors
app.use(function(err, req, res, next) {
	if (err.status === 404) res.status(404).json({ message: 'Not found' });
	else res.status(400).send(err);
});

app.listen(port, () => {
	console.log(`Started up at port ${port}`);
});

module.exports = { app };
