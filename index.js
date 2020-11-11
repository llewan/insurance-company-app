const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./src/router');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.json());
app.use(router);
app.listen(3000, () => { console.log('Running on port 3000') });