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
		console.log('hi>>>>>', req.body);
		todoModel.find().then(
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
		console.log('hiiii', body);
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
		todoModel.create({ text: req.body.text }, function(err, todo) {
			if (err) next(err);
			else
				res.send({
					todo
				});
		});
	}
};
