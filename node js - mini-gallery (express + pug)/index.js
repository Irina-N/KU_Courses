const express = require('express');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
	res.render('index.pug', {
		title: 'Gallery',
		text: 'What would you like to see?'
	});
});

app.get('/:category/?:imgId(\\d{0,})', (req, res) => {
	const {category, imgId} = req.params;
	res.render('gallery.pug', {
		title: category.slice(0, 1).toUpperCase()+category.slice(1),
		category: category,
		imgId: imgId
	});
});

app.listen(5000, function () {
	console.log('Node server is running..');
});