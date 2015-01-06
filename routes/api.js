var express = require('express');

// api routes
var sermons = require('./sermons');
var series = require('./series');
var churches = require('./churches');
var speakers = require('./speakers');

var router = express.Router();

/* GET API status page. */
router.get('/', function (req, res) {
    res.send('SermonCast API is running');
});

var defineRestMethods = function(name, resource) {
    var path = '/' + name;
    var pathById = path + '/:id';
    router.get(path, resource.findAll);
    router.post(path, resource.create);
    router.get(pathById, resource.findById);
    router.put(pathById, resource.update);
    router.delete(pathById, resource.remove);
};

defineRestMethods('sermons', sermons);
router.patch('/sermons/:id', sermons.patch);

defineRestMethods('speakers', speakers);
defineRestMethods('churches', churches);
defineRestMethods('series', series);

module.exports = router;