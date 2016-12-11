var child_process = require('child_process');
var config = require('./config');
var is_running = require('is-running');

var spawnPlayer = function (path) {
    if (path.indexOf('twitch.tv') != -1) {
        return child_process.spawn(config.twitchPlayer, [path])
    }
    else {
        return child_process.spawn(config.player, config.playerArgs.concat(path));
    }
};

var player = {
    process: null,
    state: 'stop',
    file: null,

    play: function play(path) {
        this.process = spawnPlayer(path);
        this.state = 'play';
        this.file = path;
    },
    stop: function () {
        this.send_command('q');
        this.state = 'stop';
        this.file = null;
    },
    pause: function () {
        if (this.state == 'pause' || this.state == 'play') {
            this.send_command('p');
            this.state = this.state == 'play' ? 'pause' : 'play';
        }
        else {
            throw new Error('Invalid state');
        }
    },
    is_running: function () {
        return is_running(this.process.pid);
    },
    send_command: function (command) {
        if (!this.is_running())
            return false;

        this.process.stdin.write(command);
        return true;
    }
};

module.exports = player;