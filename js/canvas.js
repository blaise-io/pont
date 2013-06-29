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

    if (/map/.test(location.search)) {
        this.addMap();
    }

    this.stopOnError();
    this.paint();
};

Z.Canvas.prototype.paint = function() {
    if (this.err) {
        return;
    }

    window.requestAnimationFrame(this.paint.bind(this));

    this.ctx.clearRect(0, 0, this.width, this.height);

    Z.game.updateGame();

    this.paintPath(Z.game.ferry.path);
    this.paintEntities(Z.game.traffic.boats);
    // this.paintEntities(Z.game.shore.segments);
    this.paintEntity(Z.game.ferry);
};

/**
 * @param {Z.Point} point
 */
Z.Canvas.prototype.drawPathPoint = function(point) {
    var ctx = this.ctx;

    ctx.fillStyle = 'white';
    ctx.fillRect(point.x, point.y, 2, 2);
};

/**
 * @param {Z.Point} point
 */
Z.Canvas.prototype.drawCrash = function(point) {
    var ctx = this.ctx;

    ctx.fillStyle = 'red';
    ctx.fillRect(point.x, point.y, 4, 4);

    ctx.font = '30px arial';
    ctx.textAlign = 'center';
    ctx.fillText('GAME OVER', this.width / 2, this.height / 2);
};

/**
 * @param {Z.Path} path
 */
Z.Canvas.prototype.paintPath = function(path) {
    if (path) {
        for (var i = 0, m = path.points.length; i < m; i++) {
            this.drawPathPoint(path.points[i]);
        }
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
        ctx.rotate(entity.radian);
        ctx.drawImage(entity.img, width / -2, height / -2, width, height);
        ctx.restore();
    }
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


Z.Canvas.prototype.stopOnError = function() {
    this.err = false;
    window.onerror = function() {
        this.err = true;
    }.bind(this);
};

Z.Canvas.prototype.addMap = function() {
    var map = new Image();
    map.src = 'img/map.png';
    this.canvas.parentNode.insertBefore(map, this.canvas);
};
