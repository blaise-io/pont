/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Game = function() {
    this.updated = new Date();
    this.detectCrashProgress = 0;
    this.detectCrashInterval = 100;
    this.ferry = new Z.Ferry();
    this.shore = new Z.Shore();
    this.traffic = new Z.Traffic(1);

    this.intersectHandler = new Z.Intersect();
    this.eventHandler = new Z.EventHandler();
    this.eventHandler.onUpdate = this.updateFerryPath.bind(this);
};

Z.Game.prototype.updateGame = function() {
    var diff = new Date() - this.updated;
    if (diff > 7 && diff < 200) {
        this.traffic.updateTraffic(diff);
        this.ferry.updateBoat(diff);
        this.updateCollisions(diff);
    }
    this.updated = new Date();
};

/**
 * @param {number} diff
 */
Z.Game.prototype.updateCollisions = function(diff) {
    this.detectCrashProgress += diff;
    if (this.detectCrashProgress > this.detectCrashInterval) {
        this.detectCrashProgress %= this.detectCrashInterval;
        this.detectCrash();
    }
};

/**
 * @param {Array.<Z.Point>} points
 */
Z.Game.prototype.updateFerryPath = function(points) {
    var ferry = this.ferry, radianToPoint, delta;
    radianToPoint = ferry.point.radianTo(points[0]);
    delta = Z.util.getRadianDelta(ferry.radian, radianToPoint);
    if (points.length <= 3 && Math.abs(delta) > Math.PI * 0.9) {
        ferry.breaking = true;
        window.setTimeout(function() {
            ferry.breaking = false;
        }.bind(this), 200);
    } else {
        ferry.path = new Z.Path(points);
    }
};

Z.Game.prototype.detectCrash = function() {
    var result;

    if (!this.ferry.ready) {
        return;
    }

    result = this.intersectHandler.hasIntersect(this.ferry, this.traffic.boats);
    if (!result) {
        result = this.intersectHandler.hasIntersect(this.ferry, this.shore.segments);
    }

    if (result) {
        Z.canvas.err = true;
        Z.canvas.drawCrash(result.point);
        document.body.onclick = function() {
            location.reload(false);
        };
    }
};
