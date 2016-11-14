var express = require('express');

var router = express.Router();

router.get('/:file', function (req, res, next) {
  req.player.play(req.params.file);
  res.render('play', { title: 'Play', file: req.params.file });
});

module.exports = router;
