const express = require('express');
const bodyParesr = require('body-parser');
const request = require('request');

const app = express();

app.use(express.static('public'));
app.use(bodyParesr.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
	console.log(req.body);
});

app.listen(3000, function () {
	console.log('Running on port 3000');
});
