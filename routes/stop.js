var express = require('express');

var router = express.Router();

router.get('/', function (req, res, next) {
    req.player.stop();
    res.redirect('/');
});

module.exports = router;