var express = require('express');
var shell = require('shelljs');

var router = express.Router();

router.get('/:file', function (req, res, next) {
  var file = req.params.file;
  var proc = shell.exec(req.config.player + ' ' + file, {async: true});
  res.render('play', { title: 'Play', file: file, pid: proc.pid });
});

module.exports = router;
