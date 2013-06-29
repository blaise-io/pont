/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Audio = function() {
    this.mp3Supported = true;
    this.files = {
        crash   : new Audio('audio/crash.mp3'),
        complete: new Audio('audio/complete.mp3'),
        music   : new Audio('audio/music.mp3')
    };
    this.playBackgroundMusic();
};

Z.Audio.prototype.playBackgroundMusic = function() {
    if (this.mp3Supported) {
        this.files.music.play();
    }
};

Z.Audio.prototype.playComplete = function() {
    if (this.mp3Supported) {
        this.files.complete.play();
    }
};

Z.Audio.prototype.playCrash = function() {
    if (this.mp3Supported) {
        this.files.music.pause();
        this.files.crash.play();
    }
};

Z.Audio.prototype.hasMp3Support = function() {
    var el = document.createElement('audio');
    return !!(el.canPlayType('audio/mpeg').replace(/no/, ''));
};
