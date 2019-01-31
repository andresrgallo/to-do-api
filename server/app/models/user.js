const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validate = require('mongoose-validator');
const saltRounds = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		trim: true,
		required: true
	},
	email: {
		type: String,
		lowercase: true,
		trim: true,
		index: true,
		unique: true,
		sparse: true,
		validate: [
			validate({
				validator: 'isEmail',
				message: 'Not a valid email.'
			})
		]
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	todos: [{ type: Schema.Types.ObjectId, ref: 'Todo' }]
});

UserSchema.pre('save', function(next) {
	this.password = bcrypt.hashSync(this.password, saltRounds);
	next();
});

module.exports = mongoose.model('User', UserSchema);
