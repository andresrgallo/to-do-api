const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
	create: function(req, res, next) {
		userModel.create(
			{
				name: req.body.name,
				email: req.body.email,
				password: req.body.password
			},
			function(err, result) {
				if (err) next(err);
				else
					res.json({
						status: 'success',
						message: 'User added successfully!!!',
						data: null
					});
			}
		);
	},

	authenticate: function(req, res, next) {
		userModel.findOne({ email: req.body.email }, function(err, userInfo) {
			if (err) {
				next(err);
			} else {
				if (
					userInfo != null &&
					bcrypt.compareSync(req.body.password, userInfo.password)
				) {
					let expiration_time = parseInt(process.env.JWT_EXPIRATION);
					const token = jwt.sign({ id: userInfo._id }, process.env.JWT_SECRET, {
						expiresIn: expiration_time
					});

					res.json({
						status: 'success',
						message: 'user found!!!',
						data: { user: userInfo, token: token }
					});
				} else {
					res.json({
						status: 'error',
						message: 'Invalid email/password!!!',
						data: null
					});
				}
			}
		});
	}
};