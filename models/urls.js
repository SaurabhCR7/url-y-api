const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const urlSchema = new Schema({
	_id: { type: String },
	url: {
		type: String,
		required: true
	},
	hash: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = URL = mongoose.model('URL', urlSchema);
