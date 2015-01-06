var Sermon = require('../models/sermon');

/**
 permalink: { type: String, required: true, unique: true },
 title: { type: String, required: true },
 description: { type: String },
 videoUri: { type: String, required: true },
 date: { type: Date, required: true },
 speakers: [{type: Schema.Types.ObjectId, ref: 'Speaker'}],
 church: {type: Schema.Types.ObjectId, ref: 'Church'},
 series: [{type: Schema.Types.ObjectId, ref: 'Series'}],
 modified: { type: Date, default: Date.now }
 */

/* GET sermons */
exports.findAll = function (req, res) {
    return Sermon.find(function (err, sermons) {
        if (!err) {
            return res.send(sermons);
        } else {
            return console.log(err);
        }
    }).populate('church series speakers');
};

/* CREATE sermon instance */
exports.create = function (req, res) {
    var sermon;
    console.log('POST: ');
    console.log(req.body);
    sermon = new Sermon({
        permalink: req.body.permalink,
        title: req.body.title,
        description: req.body.description,
        videoUri: req.body.videoUri,
        date: req.body.date,
        speakers: req.body.speakers,
        church: req.body.church,
        series: req.body.series
    });
    sermon.save(function (err) {
        if (!err) {
            console.log('created');
            return res.send(sermon);
        } else {
            console.log(err);
            return res.send({'error': 'An error has occurred - ' + err});
        }
    });
};

/* GET single sermon by :id */
exports.findById = function (req, res) {
    return Sermon.findById(req.params.id, function (err, sermon) {
        if (!err) {
            res.send(sermon);
        } else {
            console.log(err);
            res.send({'error': 'An error has occurred - ' + err});
        }
    }).populate('church series speakers');
};

/* UPDATE single sermon by :id */
exports.update = function (req, res) {
    return Sermon.findById(req.params.id, function (err, sermon) {
        sermon.permalink = req.body.permalink;
        sermon.title = req.body.title;
        sermon.description = req.body.description;
        sermon.videoUri = req.body.videoUri;
        sermon.date = req.body.date;
        sermon.speakers = req.body.speakers;
        sermon.church = req.body.church;
        sermon.series = req.body.series;
        return sermon.save(function (err) {
            if (!err) {
                console.log('updated');
                res.send(sermon);
            } else {
                console.log(err);
                res.send({'error': 'An error has occurred - ' + err});
            }
        });
    });
};

/* PATCH single sermon by :id */
exports.patch = function (req, res) {
    return Sermon.findById(req.params.id, function (err, sermon) {
        if (req.body.permalink)
            sermon.permalink = req.body.permalink;
        if (req.body.title)
            sermon.title = req.body.title;
        if (req.body.description)
            sermon.description = req.body.description;
        if (req.body.videoUri)
            sermon.videoUri = req.body.videoUri;
        if (req.body.date)
            sermon.date = req.body.date;
        // TODO: figure out how PATCH works with lists
        if (req.body.speakers)
            sermon.speakers = req.body.speakers;
        if (req.body.church)
            sermon.church = req.body.church;
        if (req.body.series)
            sermon.series = req.body.series;
        return sermon.save(function (err) {
            if (!err) {
                console.log('updated');
                res.send(sermon);
            } else {
                console.log(err);
                res.send({'error': 'An error has occurred - ' + err});
            }
        });
    });
};

/* DELETE single sermon by :id */
exports.remove = function (req, res) {
    return Sermon.findById(req.params.id, function (err, sermon) {
        return sermon.remove(function (err) {
            if (!err) {
                console.log('removed');
                res.send('');
            } else {
                console.log(err);
                res.send({'error': 'An error has occurred - ' + err});
            }
        });
    });
};