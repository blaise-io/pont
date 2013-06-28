/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Game = function() {
    this.path = null;
    this.boats = [];
    this.ferry = new Z.Entity('img/ferry.png', new Z.Point(250, 250), 0, 0.3);
    this.ferry.speed = Z.FERRY_FLOAT_SPEED;
    this.updated = new Date();
};

Z.Game.prototype.update = function() {
    var diff = new Date() - this.updated;
    this.updateFerry(diff);
    this.updated = new Date();
};

/**
 * @param {number} diff
 */
Z.Game.prototype.updateFerry = function(diff) {
    var target = this.getTarget(), ferry = this.ferry;

    if (ferry.progress > Z.FERRY_UPDATE_INTERVAL) {
        if (target) {
            ferry.radian = ferry.point.dampRadianTo(ferry.radian, target, Z.FERRY_AGILITY * Math.max(1, ferry.speed));

            var radian = ferry.point.radianTo(target);
            var delta = Math.abs(Z.util.getRadianDelta(radian, ferry.radian)) / 20;

            ferry.speed = Math.max(
                Math.min(ferry.speed + Z.FERRY_ACCELERATION, Z.FERRY_MAX_SPEED) - delta,
                Z.FERRY_FLOAT_SPEED
            );
            ferry.point = ferry.point.stepTo(target, ferry.speed, ferry.radian, Z.FERRY_VELOCITY * Math.max(1, ferry.speed));

            if (ferry.point.distanceTo(target) < Z.SWEETSPOT_TOLERANCE) {
                this.path.shiftTarget();
            }
        } else {
            ferry.point = ferry.point.stepRadian(ferry.radian, ferry.speed);
            ferry.speed = Math.max(ferry.speed - Z.FERRY_DECELERATION, Z.FERRY_FLOAT_SPEED);
        }
        ferry.progress -= Z.FERRY_UPDATE_INTERVAL;
    }

    ferry.progress += diff;
};

/**
 * @returns {Z.Point|null}
 */
Z.Game.prototype.getTarget = function() {
    return (this.path) ? this.path.getTarget() : null;
};
