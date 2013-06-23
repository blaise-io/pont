/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

Z.Canvas = function() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
};

/**
 * @param {Z.Point} point
 */
Z.Canvas.prototype.drawSubPoint = function(point) {
    this.ctx.fillStyle = 'black';
    this.ctx.beginPath();
    this.ctx.arc(point.x, point.y, 1, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fill();
};

Z.Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};
