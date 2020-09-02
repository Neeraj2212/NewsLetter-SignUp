const express = require('express');
const bodyParesr = require('body-parser');
const request = require('request');
const dotenv = require('dotenv');
dotenv.config();
const app = express();

app.use(express.static('public'));
app.use(bodyParesr.urlencoded({ extended: true }));

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/signup.html');
});

app.post('/', function (req, res) {
	var firstName = req.body.fName;
	var lastName = req.body.lName;
	var email = req.body.email;

	var data = {
		members: [
			{
				email_address: email,
				status: 'subscribed',
				merge_fields: {
					FNAME: firstName,
					LNAME: lastName,
				},
			},
		],
	};

	var jsonData = JSON.stringify(data);

	var options = {
		url:
			'https://' +
			process.env.SERVER +
			'.api.mailchimp.com/3.0/lists/' +
			process.env.LIST_ID,
		method: 'POST',
		headers: {
			Authorization: process.env.USER_NAME + ' ' + process.env.API_KEY,
		},
		body: jsonData,
	};

	request(options, function (error, response, body) {
		if (error) {
			res.sendFile(__dirname + '/success.html');
		} else {
			if (response.statusCode === 200) {
				res.sendFile(__dirname + '/success.html');
			} else {
				res.sendFile(__dirname + '/failure.html');
			}
		}
	});
});

app.post('/failure.html', function (req, res) {
	res.redirect('/');
});

app.listen(process.env.PORT, function () {
	console.log('Running on port ' + process.env.PORT);
});
