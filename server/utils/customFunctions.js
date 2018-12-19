//Check for a valid object id
var { ObjectID } = require('mongodb');

var validId = id => {
	if (!ObjectID.isValid(id)) {
		return res.status(404).send();
	}
};

module.exports = { validId };
