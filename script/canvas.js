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

    this.boats = [];
    this.path = new Z.Path();
    this.ferry = new Z.Entity('image/ferry.png', new Z.Point(100, 100), 90, 0.3);

    this.paint();
};

Z.Canvas.prototype.paint = function() {
    window.requestAnimationFrame(this.paint.bind(this));
    this.ctx.clearRect(0, 0, this.width, this.height);

    var ferry = this.ferry;
    var next = this.path.points[0];
    if (next) {
        // Smooth rotating like a real boat
        ferry.angle += (ferry.point.angleTo(next) - ferry.angle) / 100;
        ferry.point = ferry.point.stepTo(next, 1);

        if (ferry.point.distanceTo(next) < 5) {
            this.path.points.shift();
        }
    } else {
        ferry.point = ferry.point.stepAngle(ferry.angle, 1);
    }

    this.paintPath(this.path);
    this.paintEntities(this.boats);
    this.paintEntity(this.ferry);
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

/**
 * @param {Z.Path} path
 */
Z.Canvas.prototype.paintPath = function(path) {
    for (var i = 0, m = path.points.length; i < m; i++) {
        this.drawSubPoint(path.points[i]);
    }
};

/**
 * @param {Array.<Z.Entity>} entities
 */
Z.Canvas.prototype.paintEntities = function(entities) {
    for (var i = 0, m = entities.length; i < m; i++) {
        this.paintEntity(entities[i]);
    }
};

/**
 * @param {Z.Entity} entity
 */
Z.Canvas.prototype.paintEntity = function(entity) {
    var width, height, ctx = this.ctx;

    width = entity.width * entity.scale;
    height = entity.height * entity.scale;

    if (entity.ready) {
        ctx.save();
        ctx.translate(entity.point.x, entity.point.y);
        ctx.rotate(entity.angle * Math.PI / 180);
        ctx.drawImage(entity.img, width / -2, height / -2, width, height);
        ctx.restore();
    }
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
