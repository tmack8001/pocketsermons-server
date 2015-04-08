var Church = require('../../models/church');

/**
 permalink: { type: String, required: true, unique: true },
 name: { type: String, required: true },
 denomination: { type: String },
 modified: { type: Date, default: Date.now }
 */

/* GET churches */
exports.findAll = function (req, res) {
    return Church.find(function (err, churches) {
        if (!err) {
            return res.send({'churches': churches});
        } else {
            return console.log(err);
        }
    });
};

/* CREATE church instance */
exports.create = function (req, res) {
    var church;
    console.log('POST: ');
    console.log(req.body);
    church = new Church({
        permalink: req.body.permalink,
        name: req.body.name,
        denomination: req.body.denomination
    });
    church.save(function (err) {
        if (!err) {
            console.log('created');
            return res.send({'church': church});
        } else {
            console.log(err);
            return res.send({'error': 'An error has occurred - ' + err});
        }
    });
};

/* GET single church by :id */
exports.findById = function (req, res) {
    return Church.findById(req.params.id, function (err, church) {
        if (!err) {
            return res.send({'church': church});
        } else {
            console.log(err);
            return res.send({'error': 'An error has occurred - ' + err});
        }
    });
};

/* UPDATE single church by :id */
exports.update = function (req, res) {
    return Church.findById(req.params.id, function (err, church) {
        church.permalink = req.body.permalink;
        church.name = req.body.name;
        church.denomination = req.body.denomination;
        return church.save(function (err) {
            if (!err) {
                console.log('updated');
                return res.send({'church': church});
            } else {
                console.log(err);
                res.send({'error': 'An error has occurred - ' + err});
            }
        });
    });
};

/* DELETE single church by :id */
exports.remove = function (req, res) {
    return Church.findById(req.params.id, function (err, church) {
        return church.remove(function (err) {
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
