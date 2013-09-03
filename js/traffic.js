/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 * @param {Z.Game} game
 */
Z.Traffic = function(game) {
    this.game = game;
    this.boats = [];
    this.boats.push(this.getRandomBoat());
    this.spawnBoatProgress = 0;
};

Z.Traffic.prototype.getInterval = function() {
    return 7000 / Math.sqrt(this.game.level);
};

Z.Traffic.prototype.getRandomBoat = function() {
    var random = Math.random();
    if (random < 0.3) { return this.getBarge(); }
    else if (random < 0.35) { return this.getSpeedBoat(); }
    else if (random < 0.5) { return this.getCanalBoat(); }
    else if (random < 0.75) { return this.getBarge2(); }
    else { return this.getCanalBoat2(); }
};

Z.Traffic.prototype.getBarge = function() {
    return new Z.Barge(new Z.Path([
        new Z.Point(-50, -80),
        new Z.Point(-50, -80),
        new Z.Point(100, 150 + Math.random() * 80),
        new Z.Point(600, 450 + Math.random() * 30)
    ]));
};

Z.Traffic.prototype.getCanalBoat = function() {
    return new Z.CanalBoat(new Z.Path([
        new Z.Point(-70, -30),
        new Z.Point(-70, -30),
        new Z.Point(100, 220 + Math.random() * 60),
        new Z.Point(600, 550 + Math.random() * 60)
    ]));
};

Z.Traffic.prototype.getSpeedBoat = function() {
    return new Z.SpeedBoat(new Z.Path([
        new Z.Point(-100, 150),
        new Z.Point(-100, 150),
        new Z.Point(350, 500 + Math.random() * 50),
        new Z.Point(600, 700)
    ]));
};

Z.Traffic.prototype.getBarge2 = function() {
    return new Z.Barge(new Z.Path([
        new Z.Point(550, 350),
        new Z.Point(550, 350),
        new Z.Point(255, 180 + Math.random() * 50),
        new Z.Point(-30, -50 + Math.random() * 50)
    ]));
};

Z.Traffic.prototype.getCanalBoat2 = function() {
    return new Z.CanalBoat(new Z.Path([
        new Z.Point(550, 220),
        new Z.Point(550, 220),
        new Z.Point(350, 170 + Math.random() * 50),
        new Z.Point(100, -100  + Math.random() * 50)
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
    if (this.spawnBoatProgress > this.getInterval()) {
        this.boats.push(this.getRandomBoat());
        this.spawnBoatProgress = 0;
    }
};
