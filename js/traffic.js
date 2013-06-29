/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Traffic = function(level) {
    this.boats = [];
    this.boats.push(this.getRandomBoat());
    this.spawnBoatProgress = 0;
    this.spawnBoatInterval = 7000 * Math.sqrt(level);
};

Z.Traffic.prototype.getRandomBoat = function() {
    var random = Math.random();
    if (random < 0.2) { return this.getBarge(); }
    if (random < 0.25) { return this.getSpeedBoat(); }
    if (random < 0.35) { return this.getCanalBoat(); }
    if (random < 0.55) { return this.getBarge2(); }
    if (random < 0.6) { return this.getSpeedBoat2(); }
    if (random < 0.7) { return this.getCanalBoat2(); }
};

Z.Traffic.prototype.getBarge = function() {
    return new Z.Barge(new Z.Path([
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(150, 125 + Math.random() * 50),
        new Z.Point(600, 400 + Math.random() * 100)
    ]));
};

Z.Traffic.prototype.getSpeedBoat = function() {
    return new Z.SpeedBoat(new Z.Path([
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(150, 125 + Math.random() * 50),
        new Z.Point(600, 400 + Math.random() * 100)
    ]));
};

Z.Traffic.prototype.getCanalBoat = function() {
    return new Z.CanalBoat(new Z.Path([
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(150, 125 + Math.random() * 50),
        new Z.Point(600, 400 + Math.random() * 100)
    ]));
};

Z.Traffic.prototype.getBarge2 = function() {
    return new Z.Barge(new Z.Path([
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(150, 125 + Math.random() * 50),
        new Z.Point(600, 400 + Math.random() * 100)
    ]));
};

Z.Traffic.prototype.getSpeedBoat2 = function() {
    return new Z.SpeedBoat(new Z.Path([
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(150, 125 + Math.random() * 50),
        new Z.Point(600, 400 + Math.random() * 100)
    ]));
};

Z.Traffic.prototype.getCanalBoat2 = function() {
    return new Z.CanalBoat(new Z.Path([
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(100, -100 + Math.random() * 20),
        new Z.Point(150, 125 + Math.random() * 50),
        new Z.Point(600, 400 + Math.random() * 100)
    ]));
};

/**
 * @param {number} diff
 */
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

/**
 * @param {number} diff
 */
Z.Traffic.prototype.checkSpawnBoat = function(diff) {
    this.spawnBoatProgress += diff;
    if (this.spawnBoatProgress > this.spawnBoatInterval) {
        this.boats.push(this.getBarge());
        this.spawnBoatProgress %= this.spawnBoatInterval;
    }
};
