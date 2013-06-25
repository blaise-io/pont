/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

Z.Canvas = function() {
    this.canvas = document.querySelector('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.getAttribute('width');
    this.height = this.canvas.getAttribute('height');

    if (!window.requestAnimationFrame) {
        this.setVendorRequestAnimationFrame();
    }

    this.path = [];
    this.level = [];
    this.boats = [];
    this.ferries = [];

    this.paint();
};

Z.Canvas.prototype.paint = function() {
    window.requestAnimationFrame(this.paint.bind(this));
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.paintEntity(this.path);
    this.paintEntity(this.level);
    this.paintEntities(this.boats);
    this.paintEntities(this.ferries);
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

Z.Canvas.prototype.paintEntities = function(entities) {
    for (var i = 0, m = entities.length; i < m; i++) {
        this.paintEntity(entities[i]);
    }
};

Z.Canvas.prototype.paintEntity = function(entity) {

};

Z.Canvas.prototype.clear = function() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
};

Z.Canvas.prototype.setVendorRequestAnimationFrame = function() {
    window.requestAnimationFrame =
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function(callback) {
            setTimeout(callback, 1000 / 60);
        };
};
