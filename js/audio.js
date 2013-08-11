/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Audio = function() {
    this.crash = new Audio('audio/crash.mp3');
    this.score = new Audio('audio/score.mp3');
    this.level = new Audio('audio/level.mp3');
    this.music = new Audio('audio/music.mp3');
};
