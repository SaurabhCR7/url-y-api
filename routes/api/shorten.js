const express = require('express');
const router = express.Router();
const uniqid = require('uniqid');

const URL = require('./../../models/urls');

router.get('/test', (req, res) => res.json({ msg: 'API is working fine!' }));

router.post('/', (req, res) => {
	console.log(req.body);
	if (req.body.url) {
		urlData = req.body.url;
	}
	console.log('URL is:' + urlData);
	URL.findOne({ url: urlData }, (err, doc) => {
		if (doc) {
			console.log('Entry found in db!');
			res.send({
				hash: doc._id,
				status: 200,
				statusTxt: 'OK'
			});
		} else {
			console.log('This is a new link');
			const webaddress = new URL({
				_id: uniqid(),
				url: urlData
			});
			webaddress.save(err => {
				if (err) {
					return console.error(err);
				}
				res.send({
					url: urlData,
					hash: webaddress._id,
					status: 200,
					statusTxt: 'OK'
				});
			});
		}
	});
});

module.exports = router;
