var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(
	process.env.MONGOLAB_AQUA_URI,
	{ useNewUrlParser: true }
);

module.exports = { mongoose };
