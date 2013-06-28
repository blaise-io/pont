/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Ferry = function() {
    Z.Boat.call(this, 'img/ferry.png', new Z.Point(100, 100), 0, 0.2);
    this.agility = 20;
    this.floatSpeed = 0.1;
    this.maxSpeed = 2.5;
    this.velocity = 40;
    this.acceleration = 0.015;
    this.deceleration = 0.01;
};

Z.util.extend(
    Z.Ferry.prototype,
    /** @lends {Z.Ferry.prototype}*/
    Z.Boat.prototype
);

Z.Ferry.prototype.targetReached = function() {
    this.point = this.point.stepRadian(this.radian, this.speed);
    this.speed = Math.max(this.speed - this.deceleration, this.floatSpeed);
};


/**
 * @param {Z.Path} path
 * @constructor
 */
Z.Barge = function(path) {
    Z.Boat.call(this, 'img/barge.png', path.points[0], 0, 0.2);
    this.path = path;
    this.agility = 30;
    this.maxSpeed = 0.5;
    this.speed = this.maxSpeed;
    this.velocity = 40;
    this.sweetspotTolerance = 40;
};

Z.util.extend(
    Z.Barge.prototype,
    /** @lends {Z.Ferry.prototype}*/
    Z.Boat.prototype
);
