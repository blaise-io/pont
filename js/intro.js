/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Intro = function() {
    this.entity = new Z.Entity('img/intro.png', new Z.Point(250, 250));
    document.body.onclick = this.gameStart.bind(this);
};

Z.Intro.prototype.gameStart = function() {
    Z.game = new Z.Game();
    document.body.onclick = null;
};
