/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Audio = function() {
    this.files = {
        crash   : new Audio('audio/crash.mp3'),
        complete: new Audio('audio/complete.mp3'),
        music   : new Audio('audio/music.mp3')
    };
    this.playBackgroundMusic();
};

Z.Audio.prototype.playBackgroundMusic = function() {
    try {
        this.files.music.play();
    } catch(err){}
};

Z.Audio.prototype.playComplete = function() {
    try {
        this.files.complete.play();
    } catch(err){}
};

Z.Audio.prototype.playCrash = function() {
    try {
        this.files.music.pause();
        this.files.crash.play();
    } catch(err){}
};
