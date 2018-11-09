MongoClient = require('mongodb').MongoClient;

MongoClient.connect(
  'mongodb://localhost:27017/TodoList',
  {useNewUrlParser: true},
  (err, client) => {
    const db = client.db('TodoList');
    if (err) {
      return console.log('Unable to connect to TodoList');
    }
    console.log('Connected to TodoList');

    db.collection('Todos')
      .find({completed: false})
      .toArray()
      .then(document => {
        console.log('Todos');
        console.log(JSON.stringify(document, undefined, 2));
      })
      .catch(e => {
        console.log(e);
      });

    //  client.close;
  },
);
