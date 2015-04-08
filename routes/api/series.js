var Series = require('../../models/series');

/**
 permalink: { type: String, required: true, unique: true },
 church: {type: Schema.Types.ObjectId, ref: 'Church'},
 title: { type: String, required: true },
 description: { type: String },
 imageUri: { type: String, required: true },
 modified: { type: Date, default: Date.now }
 */

/* GET series */
exports.findAll = function (req, res) {
    return Series.find(function (err, series) {
        if (!err) {
            return res.send({'series': series});
        } else {
            return console.log(err);
        }
    });
};

/* CREATE series instance */
exports.create = function (req, res) {
    var series;
    console.log('POST: ');
    console.log(req.body);
    series = new Series({
        permalink: req.body.permalink,
        church: req.body.church,
        title: req.body.title,
        description: req.body.description,
        imageUri: req.body.imageUri
    });
    series.save(function (err) {
        if (!err) {
            console.log('created');
            return res.send({'series': series});
        } else {
            console.log(err);
            return res.send({'error': 'An error has occurred - ' + err});
        }
    });
};

/* GET single series by :id */
exports.findById = function (req, res) {
    return Series.findById(req.params.id, function (err, series) {
        if (!err) {
            return res.send({'series': series});
        } else {
            console.log(err);
            return res.send({'error': 'An error has occurred - ' + err});
        }
    });
};

/* UPDATE single series by :id */
exports.update = function (req, res) {
    return Series.findById(req.params.id, function (err, series) {
        series.permalink = req.body.permalink;
        series.church = req.body.church;
        series.title = req.body.title;
        series.description = req.body.description;
        series.imageUri = req.body.imageUri;
        return series.save(function (err) {
            if (!err) {
                console.log('updated');
                return res.send({'series': series});
            } else {
                console.log(err);
                res.send({'error': 'An error has occurred - ' + err});
            }
        });
    });
};

/* DELETE single series by :id */
exports.remove = function (req, res) {
    return Series.findById(req.params.id, function (err, series) {
        return series.remove(function (err) {
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
