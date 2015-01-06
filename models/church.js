var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Church mongodb schema
var ChurchSchema = new Schema({
    permalink: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    denomination: { type: String },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Church', ChurchSchema);