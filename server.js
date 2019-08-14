const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const URL = require('./models/urls');

const app = express();

app.use(bodyParser.json());

const db = require('./config/keys').mongoURI;

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

const shorten = require('./routes/api/shorten');
app.use('/api/shorten', shorten);

const redirect = require('./routes/api/redirect');
app.use('api/redirect', redirect);

app.get('/:hash', (req, res) => {
	const id = req.params.hash;
	console.log(id);
	URL.findOne({ _id: id }, (err, doc) => {
		if (doc) {
			res.redirect(doc.url);
		} else {
			res.redirect('/');
		}
	});
});

app.get('/', (req, res) => {
	res.send('Hello');
});

app.listen(3001, () => {
	console.log('App is running on port 3000.');
});
