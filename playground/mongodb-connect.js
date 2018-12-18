MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  'mongodb://localhost:27017/TodoList',
  {useNewUrlParser: true},
  (err, client) => {
    const db = client.db('TodoList');
    if (err) {
      return console.log('Unable to connect to TodoApp');
    }
    console.log('Connected to TodoList');

    db.collection('todos').insertOne(
      {text: 'play soccer', completed: false},
      (err, res) => {
        if (err) {
          console.log('Unable to add collection', err);
        }
        console.log(JSON.stringify(res.ops, undefined, 2));
      },
    );

    //Add a user collection
    db.collection('users').insertOne({name: 'julio', age: 83}, (err, res) => {
      if (err) {
        console.log('Unable to add collection', err);
      }
      console.log(JSON.stringify(res.ops, undefined, 2));
    });

    client.close;
  },
);
