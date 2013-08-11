/*jshint globalstrict:true, sub:true*/
'use strict';

var Z = {};

Z.main = function() {
    Z.stage = 'lang'; // start, intro, game, completed
    Z.canvas = new Z.Canvas();
    Z.intro = new Z.Intro();
    Z.audio = new Z.Audio();
};

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        Z.main();
    }
};
