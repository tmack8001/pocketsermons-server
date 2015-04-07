var express = require('express');

// api routes
var sermons = require('./api/sermons');
var series = require('./api/series');
var churches = require('./api/churches');
var speakers = require('./api/speakers');

var router = express.Router();

/* GET API status page. */
router.get('/', function (req, res) {
    res.send('pocketsermons API is running');
});

var defineRestMethods = function(name, resource) {
    var path = '/v1/' + name;
    var pathById = path + '/:id';
    router.get(path, resource.findAll);
    router.post(path, resource.create);
    router.get(pathById, resource.findById);
    router.put(pathById, resource.update);
    router.delete(pathById, resource.remove);
};

defineRestMethods('sermons', sermons);
router.patch('/v1/sermons/:id', sermons.patch);

defineRestMethods('speakers', speakers);
defineRestMethods('churches', churches);
defineRestMethods('series', series);

module.exports = router;
