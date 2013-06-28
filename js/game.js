/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Game = function() {
    this.updated = new Date();
    this.ferry = new Z.Ferry();
    this.traffic = new Z.Traffic(1);
};

Z.Game.prototype.updateGame = function() {
    var diff = new Date() - this.updated;
    this.traffic.updateTraffic(diff);
    this.ferry.updateBoat(diff);
    this.updated = new Date();
};
