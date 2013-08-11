/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Audio = function() {
    this.obj = {
        crash: new Audio('audio/crash.mp3'),
        score: new Audio('audio/score.mp3'),
        level: new Audio('audio/level.mp3'),
        music: new Audio('audio/music.mp3')
    };
    this.playMusic();
};

Z.Audio.prototype.playCrash = function() {
    try {
        this.obj.music.pause();
        this.obj.crash.play();
    } catch (e) {}
};

Z.Audio.prototype.playScore = function() {
    try {
        this.obj.score.src += '#'; // Safari
        this.obj.score.play();
        this.pauseMusicTemp();
    } catch (e) {}
};

Z.Audio.prototype.playLevel = function() {
    try {
        this.obj.level.src += '#'; // Safari
        this.obj.level.play();
        this.pauseMusicTemp();
    } catch (e) {}
};

Z.Audio.prototype.playMusic = function() {
    try {
        this.obj.music.play();
    } catch (e) {}
};

Z.Audio.prototype.pauseMusicTemp = function() {
    try {
        this.obj.music.pause();
        window.setTimeout(function() {
            this.obj.music.loop = true;
            this.obj.music.play();
        }.bind(this), 2000);
    } catch (e) {}
};
