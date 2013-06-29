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

    this.bigMessage = '';
    this.ignoreInput = false;

    this.pointBSM = new Z.Point(375, 152);
    this.radianBSM = -0.61;

    this.pointCS = new Z.Point(67, 352);
    this.radianCS = 2.25;

    this.score = 0;

    this.gotoCS = true;
    this.updateInstruction();

    this.docks = this.getDockEntities();
    this.target = this.getTargetEntity();
    this.ferry = new Z.Ferry(this.pointBSM, this.radianBSM);
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
        this.detectArrival();
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
 * @returns {{point:Z.Point, radian:number}}
 */
Z.Game.prototype.getTarget = function() {
    if (this.gotoCS) {
        return {
            point : this.pointCS,
            radian: this.radianCS
        };
    } else {
        return {
            point : this.pointBSM,
            radian: this.radianBSM
        };
    }
};

/**
 * @returns {Array.<Z.Entity>}
 */
Z.Game.prototype.getDockEntities = function() {
    return [
        new Z.Entity('img/dock.png', this.pointBSM, this.radianBSM),
        new Z.Entity('img/dock.png', this.pointCS, this.radianCS)
    ];
};

/**
 * @returns {Z.Entity}
 */
Z.Game.prototype.getTargetEntity = function() {
    var target = this.getTarget();
    return new Z.Entity('img/target.png', target.point, target.radian);
};

Z.Game.prototype.updateInstruction = function() {
    if (this.gotoCS) {
        this.instruction = 'Vaar naar Centraal Station';
    } else {
        this.instruction = 'Vaar naar Buiksloterweg';
    }
};

Z.Game.prototype.detectArrival = function() {
    var ferryAtTarget, ferry = this.ferry;
    ferryAtTarget = ferry.point.distanceTo(this.getTarget().point) < 7;
    if (ferryAtTarget && ferry.speed < ferry.floatSpeed * 10) {
        this.switchTarget();
        this.bigMessage = 'VET GOED! Vaar nu weer terug.';
        window.setTimeout(function() {
            this.bigMessage = '';
        }.bind(this), 4000);
    }
};

Z.Game.prototype.setFerryAtTarget = function() {
    this.ferry.speed = 0;
    if (this.gotoCS) {
        this.ferry.radian += Math.PI;
    } else {
        this.ferry.radian += Math.PI;
    }
};

Z.Game.prototype.switchTarget = function() {
    this.score++;
    this.ferry.path = null;
    this.setFerryAtTarget();
    this.gotoCS = !this.gotoCS;
    this.target = this.getTargetEntity();
    this.updateInstruction();
    this.ignoreInput = true;
    window.setTimeout(function() {
        this.ignoreInput = false;
    }.bind(this), 2000);
};

/**
 * @param {Array.<Z.Point>} points
 */
Z.Game.prototype.updateFerryPath = function(points) {
    if (this.ignoreInput) {
        return;
    }
    var ferry = this.ferry, radianToPoint, delta;
    radianToPoint = ferry.point.radianTo(points[0]);
    delta = Z.util.getRadianDelta(ferry.radian, radianToPoint);
    if (points.length <= 3 && Math.abs(delta) > Math.PI * 0.9) {
        ferry.speed = Math.max(ferry.speed - 0.3, ferry.floatSpeed);
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
        Z.canvas.paintCrash(result.point);
        this.bigMessage = 'IEDEREEN DOOD GAME OVER';
        window.setTimeout(function() {
            document.body.onclick = function() {
                window.location.reload(false);
            };
        }, 2000);

    }
};
