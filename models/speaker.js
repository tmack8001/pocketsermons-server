var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Person mongodb schema
var SpeakerSchema = new Schema({
    permalink: { type: String, required: true, unique: true },
    givenName: { type: String, required: true },
    familyName: { type: String, required: true },
    honorificPrefix: { type: String },
    honorificSuffix: { type: String },
    images: {
        profile: {
            uri: { type: String }
        }
    },
    affiliation: {
        name: { type: String },
        role: { type: String }
    },
    modified: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Speaker', SpeakerSchema);
