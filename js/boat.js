/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 * @extends {Z.Entity}
 */
Z.Boat = function() {
    Z.Entity.apply(this, arguments);
    /** @type {Z.Path} */
    this.path = null;
    this.speed = 0;

    this.breaking = false;

    this.agility = 20;
    this.floatSpeed = 0.1;
    this.maxSpeed = 2.5;
    this.velocity = 40;
    this.acceleration = 0.1;
    this.deceleration = 0.1;

    this.progress = 0;
    this.updateInterval = 30;
    this.sweetspotTolerance = 20;
};

Z.util.extend(
    Z.Boat.prototype,
    /** @lends {Z.Boat.prototype} */
    Z.Entity.prototype
);

/**
 * @param {number} diff
 */
Z.Boat.prototype.updateBoat = function(diff) {
    var target = this.getTarget();

    if (this.progress > this.updateInterval) {
        if (target) {

            this.moveToTarget(target);
        } else {
            this.targetReached();
        }
        this.progress -= this.updateInterval;
    }

    this.progress += diff;
};

/**
 * @param {Z.Point} target
 */
Z.Boat.prototype.moveToTarget = function(target) {
    var deceleration, radian, deltaTurning;

    this.radian = this.point.dampRadianTo(
        this.radian, target, this.agility * Math.max(1, this.speed)
    );

    radian = this.point.radianTo(target);
    deltaTurning = Math.abs(Z.util.getRadianDelta(radian, this.radian));
    deceleration = (deltaTurning * this.deceleration) * 2;

    if (this.breaking) {
        this.speed -= 0.1;
    }

    this.speed = Math.max(
        Math.min(this.speed + this.acceleration, this.maxSpeed) - deceleration,
        this.floatSpeed
    );

    this.point = this.point.stepTo(
        target, this.speed, this.radian, this.velocity * Math.max(1, this.speed)
    );

    if (this.point.distanceTo(target) < this.sweetspotTolerance) {
        this.path.shiftTarget();
    }
};

Z.Boat.prototype.targetReached = function() {
    this.destruct = true;
};

/**
 * @returns {Z.Point}
 */
Z.Boat.prototype.getTarget = function() {
    return (this.path) ? this.path.getTarget() : null;
};
