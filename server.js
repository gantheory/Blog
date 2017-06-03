const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());

let data = [];

app.use(express.static(`${__dirname}/client/build/`));

function sendHomepage(req, res) {
  res.sendFile(__dirname + '/client/public/index.html');
}

function getPosts(req, res) {
  res.json(data);
}

function getPost(req, res) {
  res.json(data[req.params.id]);
}

function postPost(req, res) {
  data.push({
    id: req.body.id,
    postTitle: req.body.postTitle,
    postText: req.body.postText,
  });
}

app.get('/', sendHomepage);
app.get('/api/posts', getPosts);
app.get('/api/post/:id', getPost);
app.post('/api/post', postPost);

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`);
  // eslint-disable-line no-console
});
