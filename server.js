const express = require('express');
// Runs the 'npm i mongodb' and then creates a constant variable 'MongoClient' and requiress mongodb
const { MongoClient } = require('mongodb');

// assigns the app variable to express()
const app = express();
// sets port to 3001
const port = 3001;

// Saves a string where MongoDB is hosting its server
const connectionStringURI = `mongodb://127.0.0.1:27017`;

// Creates a new connection to the mongo client and assigns it the variable 'client'
const client = new MongoClient(connectionStringURI);

// declars 'db' as the variable to hold the connection
let db;

// creates the database name 'inventoryDB' and assigns it the variable 'dbName'
const dbName = 'inventoryDB';

// uses the method '.connect' to connect to the server (the method connect is a class thats created from MongoClient)
client.connect()
  .then(() => {
    console.log('Connected successfully to MongoDB');
  // uses client.db() constructer and adds a new 'db' instance
    db = client.db(dbName);
// starts the express server
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  })
  .catch((err) => {
    console.error('Mongo connection error: ', err.message);
  });

  // Built in Express function that parses incoming requests to JSON
app.use(express.json());



app.post('/create', (req, res) => {
  //  Uses db connection to add a document
  db.collection('bookCollection').insertOne(
    { title: req.body.title, author: req.body.author }
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.post('/create-many', (req, res) => {
  db.collection('bookCollection').insertMany(
    [
      { "title": "Oh the Places We Will Go!" },
      { "title": "Diary of Anne Frank" }
    ]
  )
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});

app.get('/read', (req, res) => {
  //  Use db connection to find all documents in collection
  db.collection('bookCollection')
    .find({})
    .toArray()
    .then(results => res.json(results))
    .catch(err => {
      if (err) throw err;
    });
});
