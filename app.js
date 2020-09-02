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
	var firstName = req.body.fName;
	var lastName = req.body.lName;
	var email = req.body.email;
	// console.log(firstName, lastName, email);

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
		url: 'https://us17.api.mailchimp.com/3.0/lists/8b911dc47a',
		method: 'POST',
		headers: {
			Authorization: 'neeraj2212 3492b2b58ee31487c79d49d67a8788d1-us17',
		},
		body: jsonData,
	};

	request(options, function (error, response, body) {
		if (error) {
			console.log(error);
		} else {
			console.log(response.statusCode);
		}
	});
});

app.listen(3000, function () {
	console.log('Running on port 3000');
});

//list id 8b911dc47a
//api key 3492b2b58ee31487c79d49d67a8788d1-us17
