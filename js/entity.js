/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @param {string} src
 * @param {Z.Point} point
 * @param {number=} radian
 * @param {number=} scale
 * @constructor
 */
Z.Entity = function(src, point, radian, scale) {
    this.point = point;
    this.radian = radian || 0;
    this.scale = scale || 1;
    this.ready = false;
    this.progress = 0;
    this.outline = false;
    this.img = this.preloadSrc(src);
};

/**
 * @param {string} src
 */
Z.Entity.prototype.preloadSrc = function(src) {
    var img = new Image();

    img.src = src;
    img.onload = function() {
        this.ready = true;
        this.width = img.width;
        this.height = img.height;
        if (this.onload) {
            this.onload(this);
        }
    }.bind(this);

    return img;
};

