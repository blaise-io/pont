/*jshint globalstrict:true, sub:true*/
'use strict';

var Z = {};

Z.main = function() {
    Z.canvas = new Z.Canvas();
    Z.eventHandler = new Z.EventHandler();

};

document.onreadystatechange = function() {
    if (document.readyState === 'complete') {
        Z.main();
    }
};
