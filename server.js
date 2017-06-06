const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const assert = require('assert');

const app = express();

const url = "mongodb://admin:admin@ds163721.mlab.com:63721/2017-web-programming-hw3-database";

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());

app.use(express.static(`${__dirname}/client/build/`));

function sendHomepage(req, res) {
  res.sendFile(__dirname + '/client/build/index.html');
}

function getPosts(req, res) {
  let posts = [];
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    const cursor = db.collection('posts').find();
    cursor.forEach((post, err) => {
      assert.equal(null, err);
      posts.push(post);
    }, () => {
      db.close();
      res.json(posts);
    });
  });
}

function getOnePost(req, res) {
  let posts = [];
  mongo.connect(url, (err, db) => {
    assert.equal(null, err);
    const cursor = db.collection('posts').find();
    cursor.forEach((post, err) => {
      assert.equal(null, err);
      posts.push(post);
    }, () => {
      db.close();
      res.json(posts[req.params.id]);
    });
  });
}

function postPost(req, res) {
  const post = {
    id: req.body.id,
    postTitle: req.body.postTitle,
    postText: req.body.postText,
  };
  mongo.connect(url, (err, db) => {
    db.collection('posts').insertOne(post, (err, res) => {
      db.close();
    });
  });
}

app.get('/', sendHomepage);
app.get('/api/posts', getPosts);
app.get('/api/post/:id', getOnePost);
app.post('/api/post', postPost);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  // eslint-disable-line no-console
});
