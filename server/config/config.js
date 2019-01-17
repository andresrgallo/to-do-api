let env = process.env.NODE_ENV || 'development';
console.log('env-----', env);

if (env === 'development') {
	process.env.PORT = 5000;
	process.env.MONGOLAB_AQUA_URI = 'mongodb://localhost:27017/TodoList';
} else if (env === 'test') {
	process.env.PORT = 5000;
	process.env.MONGOLAB_AQUA_URI = 'mongodb://localhost:27017/TodoListTest';
}
