/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Traffic = function(level) {
    this.boats = [];
    this.boats.push(this.getBarge());
    this.spawnBoatProgress = 0;
    this.spawnBoatInterval = 5000;
};

Z.Traffic.prototype.getBarge = function() {
    return new Z.Barge(new Z.Path([
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(150, 125 + Math.random() * 50),
        new Z.Point(600, 400 + Math.random() * 100)
    ]));
};

Z.Traffic.prototype.updateTraffic = function(diff) {
    this.checkSpawnBoat(diff);
    for (var i = 0, m = this.boats.length; i < m; i++) {
        var boat = this.boats[i];
        if (boat) {
            if (boat.destruct) {
                this.boats.splice(i, 1);
            } else {
                boat.updateBoat(diff);
            }
        }
    }
};

Z.Traffic.prototype.checkSpawnBoat = function(diff) {
    this.spawnBoatProgress += diff;
    if (this.spawnBoatProgress > this.spawnBoatInterval) {
        this.boats.push(this.getBarge());
        this.spawnBoatProgress -= this.spawnBoatInterval;
    }
};
