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
    this.traffic = new Z.Traffic(1);
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

Z.Game.prototype.updateCollisions = function(diff) {
    this.detectCrashProgress += diff;
    if (this.detectCrashProgress > this.detectCrashInterval) {
        this.detectCrashProgress %= this.detectCrashInterval;
        this.detectCrash();
    }
};

Z.Game.prototype.detectCrash = function() {
    for (var i = 0, m = this.traffic.boats.length; i < m; i++) {
        var boat = this.traffic.boats[i];
        if (boat.ready && this.ferry.ready) {
            Z.intersect.isIntersect(boat, this.ferry);
        }
    }
};
