const { userModel } = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

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
						data: { result }
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
					res.status(400).send(err);
				}
			}
		});
	},

	forgotPassword: function(req, res, next) {
		userModel
			.findOne({ email: req.body.email })
			.then(user => {
				var newPass = crypto.randomBytes(20).toString('hex');
				if (user != null) {
					res.json({
						status: 'success'
					});
					user.code = newPass;
					user
						.save()
						.then(done => {
							let transporter = nodemailer.createTransport({
								host: 'smtp.zoho.com',
								port: 465,
								secure: true,
								auth: {
									user: process.env.EMAIL_COMPANY,
									pass: process.env.PASS
								}
							});
							let mailOptions = {
								from: process.env.EMAIL_COMPANY,
								to: user.email,
								replyTo: process.env.EMAIL_COMPANY,
								subject: 'From the Todo App: Password Reset',
								text:
									'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
									'Please enter the following temporary password in the link provided.  After entering the password you will be redirected to your profile page where you can enter a new password\n\n' +
									'Your temporary password is: ' +
									newPass +
									'\n\n' +
									'Click the following link or paste this into your browser where you can enter the code provided\n\n' +
									'http://localhost:3000/reset-password' +
									'\n\n' +
									'If you did not request this, please ignore this email and your password will remain unchanged.\n'
								// html: htmlEmail
							};
							transporter.sendMail(mailOptions, error => {
								done(error, 'done');
							});
						})
						.catch(err => {
							return next(err);
						});
				} else {
					return res.status(404).send({ error: 'Email not found' });
				}
			})
			.catch(e => console.log('error', e));
	},

	resetPassword: function(req, res, next) {
		userModel
			.findOne({ code: req.body.code })
			.then(user => {
				console.log('reset user', user);
				if (user != null) {
					console.log('hi reset serv', req.body);
					res.json({
						status: 'success'
					});
					user.password = req.body.code;
					user
						.save()
						.then(() => console.log('Succesfully reset password'))
						.catch(e => console.log('reset password error', e));
				} else {
					console.log('something wrong');
					return res.status(404).send({ error: 'wrong password' });
				}
			})
			.catch(e => console.log('wrong temp password', e));
	},

	update: function(req, res, next) {
		userModel
			.findOne({ email: req.body.email })
			.then(user => {
				if (
					user != null &&
					bcrypt.compareSync(req.body.oldPassword, user.password)
				) {
					res.json({
						status: 'success'
					});
				} else {
					res.status(404).send({
						status: 'Old password does not match'
					});
				}
				user.password = req.body.newPassword;
				user.code = '';
				user
					.save()
					.then(() => console.log('ok'))
					.catch(e => console.log(e));
			})
			.catch(err => {
				return next(err);
			});
	}
};
