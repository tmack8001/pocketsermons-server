var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Sermon mongodb schema
var SermonSchema = new Schema({
    permalink: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    videoUri: { type: String, required: true },
    date: { type: Date, required: true },
    speakers: [{type: Schema.Types.ObjectId, ref: 'Speaker'}],
    church: {type: Schema.Types.ObjectId, ref: 'Church'},
    series: {type: Schema.Types.ObjectId, ref: 'Series'},
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Sermon', SermonSchema);