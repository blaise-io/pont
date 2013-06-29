/*jshint globalstrict:true, sub:true*/
'use strict';

var Z = {};

Z.main = function() {
    Z.game = new Z.Game();
    Z.canvas = new Z.Canvas();
    Z.intersect = new Z.Intersect();
};

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        Z.main();
    }
};
