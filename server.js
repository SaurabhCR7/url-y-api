const express = require('express');
//const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const URL = require('./models/urls');

const port = process.env.PORT || 3001;

const app = express();
//app.use(cors());
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, OPTIONS, PUT, PATCH, DELETE'
	);
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-Requested-With,content-type'
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});
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

app.listen(port, () => {
	console.log(`App is running on port ${port}!`);
});
