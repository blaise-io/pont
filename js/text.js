/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

Z.Text = function(str, align, x, y, size) {
    this.str = str;
    this.align = align || 'left';
    this.x = x || 0;
    this.y = y || 0;
    this.size = size || 20;
};

Z.MiddleText = function(str, align, x, y, size) {
    Z.Text.apply(this, arguments);
    this.y += Z.canvas.height / 2;
};

Z.util.extend(
    Z.MiddleText.prototype,
    /** @lends {Z.Text.prototype}*/
    Z.Text.prototype
);


Z.HeaderText = function(str) {
    Z.MiddleText.apply(this, arguments);
    this.align = 'center';
    this.size = 30;
    this.y -= 50;
};

Z.util.extend(
    Z.HeaderText.prototype,
    /** @lends {Z.MiddleText.prototype}*/
    Z.MiddleText.prototype
);
