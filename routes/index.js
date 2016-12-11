var express = require('express');
var shell = require('shelljs');
var querystring = require('querystring');
var router = express.Router();

var getFiles = function (root, extensions) {
    var files = [];
    shell.ls('-R', root).forEach(function (file) {
        var ext = file.split('.').pop();
        if (extensions.indexOf(ext) != -1) {
            var path = querystring.escape(root + '/' + file);
            files.push({name: file.split('/').pop(), path: path});
        }
    });
    return files;
};

router.get('/', function (req, res, next) {
    var list = [];
    req.config.directories.forEach(function (dir) {
        list = list.concat(getFiles(dir, req.config.extensions));
    });
    res.render('index', {title: 'List', list: list});
});

router.get('/state', function (req, res, next) {
    res.json({is_running: req.player.is_running()});
});

module.exports = router;
