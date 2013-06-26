/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @param {number} x
 * @param {number} y
 * @constructor
 */
Z.Point = function(x, y) {
    this.x = x;
    this.y = y;
};

Z.Point.prototype.distanceTo = function(point) {
    var sum = Math.pow(point.x - this.x, 2) + Math.pow(point.y - this.y, 2);
    return Math.sqrt(sum);
};

Z.Point.prototype.angleTo = function(point) {
    var dx = point.x - this.x, dy = this.y - point.y;
    return Math.atan2(dx, dy) * (180 / Math.PI);
};
