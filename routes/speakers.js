var Speaker = require('../models/speaker');

/**
 permalink: { type: String, required: true, unique: true },
 givenName: { type: String, required: true },
 familyName: { type: String, required: true },
 honorificPrefix: { type: String },
 honorificSuffix: { type: String },
 affiliation: {
        name: { type: String },
        role: { type: String }
    },
 modified: { type: Date, default: Date.now }
 */

/* GET speakers */
exports.findAll = function (req, res) {
    return Speaker.find(function (err, speakers) {
        if (!err) {
            return res.send(speakers);
        } else {
            return console.log(err);
        }
    });
};

/* CREATE speaker instance */
exports.create = function (req, res) {
    var speaker;
    console.log('POST: ');
    console.log(req.body);
    speaker = new Speaker({
        permalink: req.body.permalink,
        givenName: req.body.givenName,
        familyName: req.body.familyName,
        honorificPrefix: req.body.honorificPrefix,
        honorificSuffix: req.body.honorificSuffix,
        affiliation: req.body.affiliation
    });
    speaker.save(function (err) {
        if (!err) {
            console.log('created');
            return res.send(speaker);
        } else {
            console.log(err);
            return res.send({'error': 'An error has occurred - ' + err});
        }
    });
};

/* GET single sermon by :id */
exports.findById = function (req, res) {
    return Speaker.findById(req.params.id, function (err, speaker) {
        if (!err) {
            return res.send(speaker);
        } else {
            console.log(err);
            return res.send({'error': 'An error has occurred - ' + err});
        }
    });
};

/* UPDATE single sermon by :id */
exports.update = function (req, res) {
    return Speaker.findById(req.params.id, function (err, speaker) {
        speaker.permalink = req.body.permalink;
        speaker.givenName = req.body.givenName;
        speaker.familyName = req.body.familyName;
        speaker.honorificPrefix = req.body.honorificPrefix;
        speaker.honorificSuffix = req.body.honorificSuffix;
        speaker.affiliation = req.body.affiliation;
        return speaker.save(function (err) {
            if (!err) {
                console.log('updated');
                return res.send(speaker);
            } else {
                console.log(err);
                res.send({'error': 'An error has occurred - ' + err});
            }
        });
    });
};

/* DELETE single speakeråß by :id */
exports.remove = function (req, res) {
    return Speaker.findById(req.params.id, function (err, speaker) {
        return speaker.remove(function (err) {
            if (!err) {
                console.log('removed');
                return res.send('');
            } else {
                console.log(err);
                res.send({'error': 'An error has occurred - ' + err});
            }
        });
    });
};