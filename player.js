var child_process = require('child_process');
var config = require('./config');

var player = {
    process: null,
    play: function play (path) {
        this.process = child_process.spawn(config.player, config.playerArgs.concat(path));
    },
    stop: function () {
        this.process.stdin.write('q');
    },
    pause: function () {
        this.process.stdin.write('p');
    }
};

module.exports = player;