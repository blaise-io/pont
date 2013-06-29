/*jshint globalstrict:true, sub:true*/
'use strict';

var Z = {};

Z.main = function() {
    Z.intro = new Z.Intro();
    Z.canvas = new Z.Canvas();
    Z.audio = new Z.Audio();
};

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        Z.main();
    }
};
