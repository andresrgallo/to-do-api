const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoList',
  {useNewUrlParser: true},
  (err, client) => {
    const db = client.db('TodoList');
    if (err) {
      return console.log('Unable to connect to TodoList');
    }
    console.log('Connected to TodoList');

    //Find collections:
    //    db.collection('Todos')
    //      .find({completed: false})
    //      .toArray()
    //      .then(document => {
    //        console.log('Todos');
    //        console.log(JSON.stringify(document, undefined, 2));
    //      })
    //      .catch(e => {
    //        console.log(e);
    //      });

    //Delete collections:
    //    db.collection('Todos')
    //      .deleteMany({completed: false})
    //      .then(res => console.log(res))
    //      .catch(e => console.log(e));

    //
    //
    //
    //Update collections:

    db.collection('User')
      .findOneAndUpdate(
        {_id: new ObjectID('5be4d00b0993ff6e5c246bfb')},
        {
          $set: {name: 'lucas'},
          $inc: {age: 1},
        },
        {returnOriginal: false},
      )
      .then(res => console.log(res))
      .catch(e => console.log(e));
    //  client.close;
  },
);
