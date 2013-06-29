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

/**
 * @param {number} dx
 * @param {number} dy
 * @returns {Z.Point}
 */
Z.Point.prototype.translate = function(dx, dy) {
    return new Z.Point(this.x + dx, this.y + dy);
};

/**
 * @param {Z.Point} target
 * @returns {number}
 */
Z.Point.prototype.distanceTo = function(target) {
    var sum = Math.pow(target.x - this.x, 2) + Math.pow(target.y - this.y, 2);
    return Math.sqrt(sum);
};

/**
 * @param {Z.Point} target
 * @returns {number}
 */
Z.Point.prototype.radianTo = function(target) {
    var dy = this.y - target.y, dx = this.x - target.x;
    return Math.atan2(dy, dx) % Math.PI;
};

/**
 * @param {Z.Point} target
 * @param {number} distance
 * @param {number} currentRadian
 * @param {number} damping
 * @returns {Z.Point}
 */
Z.Point.prototype.stepTo = function(target, distance, currentRadian, damping) {
    var radian = this.dampRadianTo(currentRadian, target, damping);
    return this.stepRadian(radian, distance);
};

/**
 * @param {number} angle
 * @param {number} distance
 * @returns {Z.Point}
 */
Z.Point.prototype.stepRadian = function(angle, distance) {
    var cos = Math.cos(angle) * distance, sin = Math.sin(angle) * distance;
    return new Z.Point(this.x - cos, this.y - sin);
};

/**
 * @param {number} angle
 * @param {number} xDistance
 * @param {number} yDistance
 * @returns {Z.Point}
 */
Z.Point.prototype.stepRadian2 = function(angle, xDistance, yDistance) {
    return new Z.Point(
        this.x + (Math.cos(angle) * xDistance - Math.sin(angle) * yDistance),
        this.y + (Math.sin(angle) * xDistance + Math.cos(angle) * yDistance)
    );
};

/**
 * @param {number} currentRadian
 * @param {Z.Point} target
 * @param {number} damping
 * @returns {number}
 */
Z.Point.prototype.dampRadianTo = function(currentRadian, target, damping) {
    var delta = Z.util.getRadianDelta(currentRadian, this.radianTo(target));
    return currentRadian + (delta / damping);
};
