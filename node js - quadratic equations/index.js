const express = require('express');
const app = express();
const bodyParser = require("body-parser");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.route('/')
	.get( (req, res) => {
		res.sendFile('index.html');
	})
	.post((req, res) => {

		const getAnswer = require('./Solution.js');
		const { a = +a, b = +b, c = +c } = req.body
		const answer = (getAnswer(a, b, c));
		let html = `
			<!DOCTYPE html>

			<html>
			
			<head>
				<meta charset="utf-8" />
				<link rel="stylesheet" type="text/css" href="/style.css">
				<title>Solve quadratic equations</title>
			</head>
			
			<body>
				<div class="answer-block">
					<p><strong>Answer: <strong>${answer.length ? answer.join(', ') : 'No solutions'}</p>
					<a class="btn" href="/">Solve another one</a>
				</div>
			</body>
			
			</html>`
			res.send(html);
	});

const server = app.listen(5000, function () {
	console.log('Node server is running..');
});