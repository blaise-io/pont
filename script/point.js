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
    var dy = this.y - point.y, dx = this.x - point.x;
    return Math.atan2(dy, dx) * (180 / Math.PI);
};

Z.Point.prototype.stepTo = function(point, distance) {
    return this.stepAngle(this.angleTo(point), distance);
};

Z.Point.prototype.stepAngle = function(angle, distance) {
    var cos = Math.cos(angle) * distance, sin = Math.sin(angle) * distance;
    return new Z.Point(this.x + cos, this.y + sin);
};
