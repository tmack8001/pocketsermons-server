var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Series mongodb schema
var SeriesSchema = new Schema({
    permalink: { type: String, required: true, unique: true },
    church: {type: Schema.Types.ObjectId, ref: 'Church'},
    title: { type: String, required: true },
    description: { type: String },
    imageUri: { type: String },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Series', SeriesSchema);
