/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

Z.Shore = function() {
    this.segments = [
        // Bottom shore
        this.getSegment(40, 368, 1.21),
        // Top shore
        this.getSegment(148, -244, 1.3),
        // Top shore small right
        this.getSegment(392, 131, 1.3, 0.1),
        // Top shore small extension
        this.getSegment(506, 112, 2.8, 0.2),
        // Top dock 1
        this.getSegment(408, 106, 2.8, 0.1),
        // Top dock 2
        this.getSegment(429, 135, 2.8, 0.1),
        // Bottom dock 1
        this.getSegment(19, 382, 2.72, 0.1),
        // Bottom dock 2
        this.getSegment(47, 405, 2.72, 0.1)
    ];
};

Z.Shore.prototype.getSegment = function(x, y, radian, scale) {
    var img, point = new Z.Point(x, y);
    img = 'img/collision.png';
    return new Z.Entity(img, point, Math.PI * radian, scale);
};
