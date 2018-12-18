var mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {type: String, required: true, minlength: 5, trim: true},
  completed: {type: Boolean, default: false},
  completedAt: {type: Number, default: null},
});

//var newTodo = new Todo({text: 'Cook dinner'});
//
//newTodo
//  .save()
//  .then(res => console.log(res), e => cosnsole.log('Unable to save Todo'));
//
module.exports = {Todo};
