var express = require('express');

var router = express.Router();

router.get('/', function (req, res, next) {
    req.player.pause();
    res.end();
});

module.exports = router;