const { todoModel } = require('../models/todo');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

module.exports = {
	getById: function(req, res, next) {
		const id = req.params.id;
		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}
		todoModel
			.findById(id)
			.then(todo => {
				if (!todo) {
					return res.status(404).send();
				}
				res.send({ todo });
			})
			.catch(e => {
				res.status(400).send();
			});
	},

	getAll: function(req, res, next) {
		todoModel.find({ userId: req.body.userId }).then(
			todos => {
				res.send({ todos });
			},
			e => {
				res.status(400).send(e);
			}
		);
	},

	updateById: function(req, res, next) {
		const { id } = req.params;
		const body = _.pick(req.body, ['text', 'completed']);
		body.completed = body.completed === 'true' ? true : false;
		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}

		if (_.isBoolean(body.completed) && body.completed) {
			body.completedAt = new Date().getTime();
		} else {
			body.completed = false;
			body.completedAt = null;
		}

		todoModel
			.findByIdAndUpdate(id, { $set: body }, { new: true })
			.then(todo => {
				if (!todo) {
					return res.status(404).send();
				}
				res.send({ todo });
			})
			.catch(e => {
				res.status(400).send();
			});
	},

	deleteById: function(req, res, next) {
		var id = req.params.id;

		if (!ObjectID.isValid(id)) {
			return res.status(404).send();
		}

		todoModel
			.findByIdAndRemove(id)
			.then(todo => {
				if (!todo) {
					return res.status(404).send();
				}

				res.send({ todo });
			})
			.catch(e => {
				res.status(400).send();
			});
	},

	create: function(req, res, next) {
		const theDate = new Date().getTime();
		todoModel.create(
			{ text: req.body.text, userId: req.body.userId, createdAt: theDate },
			function(err, todo) {
				if (err) {
					console.log('errrrrr', err.errors.text.message);
					next(err);
				} else
					res.send({
						todo
					});
			}
		);
	}
};
