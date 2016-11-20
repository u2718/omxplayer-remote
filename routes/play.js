var express = require('express');

var router = express.Router();

router.get('/:file', function (req, res, next) {
  var file;
  if (req.player.state == 'stop') {
    file = req.params.file;
    req.player.play(file);
  }
  else {
    file = req.player.file;
  }
  res.render('play', { title: 'Play', file: file });
});

module.exports = router;
