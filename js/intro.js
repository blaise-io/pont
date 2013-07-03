/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Intro = function() {
    this.entity = new Z.Entity('img/intro.png', new Z.Point(250, 250));
    document.ontouchend = this.gameStart;
    document.onclick = this.gameStart;
};

Z.Intro.prototype.gameStart = function(ev) {
    document.ontouchend = null;
    document.onclick = null;
    Z.game = new Z.Game();
    ev.stopPropagation();
};
