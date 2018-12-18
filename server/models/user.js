var mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {type: String, required: true, minLength: 1, trim: true},
});

//var newUser = new User({email: 'and@mail.com'});
//
//newUser.save().then(res => console.log(res), e => console.log(e));
//
module.exports = {User};
