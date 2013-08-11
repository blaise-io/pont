/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Intro = function() {
    this.text = [
        new Z.HeaderText(Z.LANG.PICK),
        new Z.MiddleText(Z.LANG.DUTCH, 'left', 45),
        new Z.MiddleText(Z.LANG.ENGLISH, 'right', 45)
    ];
    document.onclick = document.ontouchstart = this.detectLanguage.bind(this);
};

Z.Intro.prototype.detectLanguage = function(ev) {
    var point = Z.EventHandler.prototype.getEventPoint(ev);
    if (point.y > Z.canvas.height / 2 - 50 && point.y < Z.canvas.height / 2 + 50) {
        if (point.x < Z.canvas.width / 2) {
            Z.STR = Z.LANG.NL;
        } else {
            Z.STR = Z.LANG.EN;
        }
        this.showIntro();
        Z.audio.playMusic();
    }
};

Z.Intro.prototype.showIntro = function() {
    this.text = [
        new Z.MiddleText(Z.STR.INSTRUCT1, 'left', 50, -50),
        new Z.MiddleText(Z.STR.INSTRUCT2, 'left', 50, 0),
        new Z.MiddleText(Z.STR.INSTRUCT3, 'left', 50, 55, 25)
    ];

    document.ontouchstart = null;
    document.onclick = document.ontouchend = this.gameStart.bind(this);
};

Z.Intro.prototype.gameStart = function(ev) {
    document.ontouchend = document.onclick = null;
    Z.game = new Z.Game();
    ev.stopPropagation();
};
