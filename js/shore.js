/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

Z.Shore = function() {
    this.segments = [
        this.getSegment(40, 368, 1.21),
        this.getSegment(148, -244, 1.3),
        this.getSegment(392, 131, 1.3, 0.1),
        this.getSegment(506, 112, 2.8, 0.2)
    ];
};

Z.Shore.prototype.getSegment = function(x, y, radian, scale) {
    var img, point = new Z.Point(x, y);
    img = 'img/collision.png';
    return new Z.Entity(img, point, Math.PI * radian, scale);
};
