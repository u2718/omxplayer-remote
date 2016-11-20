var child_process = require('child_process');
var config = require('./config');

var player = {
    process: null,
    state: 'stop',
    file: null,

    play: function play (path) {
        this.process = child_process.spawn(config.player, config.playerArgs.concat(path));
        this.state = 'play';
        this.file = path;
    },
    stop: function () {
        this.process.stdin.write('q');
        this.state = 'stop';
        this.file = null;
    },
    pause: function () {
        if (this.state == 'pause' || this.state == 'play') {
            this.process.stdin.write('p');
            this.state = this.state == 'play' ? 'pause' : 'play';
        }
        else {
            throw new Error('Invalid state');
        }
    }
};

module.exports = player;