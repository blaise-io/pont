/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Game = function() {
    this.updated = new Date();
    this.detectCrashProgress = 0;
    this.detectCrashInterval = 100;

    this.ignoreInput = false;

    this.pointBSM = new Z.Point(375, 152);
    this.radianBSM = -0.61;

    this.pointCS = new Z.Point(67, 352);
    this.radianCS = 2.25;

    this.score = 0;
    this.level = 1;

    this.gotoCS = true;

    this.setupTexts();
    this.updateInstruction();

    this.docks = this.getDockEntities();
    this.target = this.getTargetEntity();
    this.ferry = new Z.Ferry(this.pointBSM, this.radianBSM);
    this.shore = new Z.Shore();
    this.traffic = new Z.Traffic(this);

    this.intersectHandler = new Z.Intersect();
    this.eventHandler = new Z.EventHandler();
    this.eventHandler.onUpdate = this.updateFerryPath.bind(this);
};

Z.Game.prototype.setupTexts = function() {
    this.textInstruct = new Z.Text('', 'left', 10, 20);
    this.textHeader = new Z.HeaderText('', 'center');
    this.textMessage = new Z.MiddleText('', 'center');
    this.textLevel = new Z.Text(Z.STR.UI_LEVEL + this.level, 'right', 10, 20);
    this.textScore = new Z.Text(Z.STR.UI_SCORE + this.score, 'right', 120, 20);
    this.texts = [
        this.textInstruct,
        this.textLevel,
        this.textScore,
        this.textHeader,
        this.textMessage
    ];
};

Z.Game.prototype.updateGame = function() {
    var diff = new Date() - this.updated;
    if (diff > 7 && diff < 200) {
        this.traffic.updateTraffic(diff);
        this.ferry.updateBoat(diff);
        this.updateCollisions(diff);
        this.detectArrival();
    }
    this.updated = new Date();
};

/**
 * @param {number} diff
 */
Z.Game.prototype.updateCollisions = function(diff) {
    this.detectCrashProgress += diff;
    if (this.detectCrashProgress > this.detectCrashInterval) {
        this.detectCrashProgress %= this.detectCrashInterval;
        this.detectCrash();
    }
};

/**
 * @returns {{point:Z.Point, radian:number}}
 */
Z.Game.prototype.getTarget = function() {
    if (this.gotoCS) {
        return {
            point : this.pointCS,
            radian: this.radianCS
        };
    } else {
        return {
            point : this.pointBSM,
            radian: this.radianBSM
        };
    }
};

/**
 * @returns {Array.<Z.Entity>}
 */
Z.Game.prototype.getDockEntities = function() {
    return [
        new Z.Entity('img/dock.png', this.pointBSM, this.radianBSM),
        new Z.Entity('img/dock.png', this.pointCS, this.radianCS)
    ];
};

/**
 * @returns {Z.Entity}
 */
Z.Game.prototype.getTargetEntity = function() {
    var target = this.getTarget();
    return new Z.Entity('img/target.png', target.point, target.radian);
};

Z.Game.prototype.updateInstruction = function() {
    if (this.gotoCS) {
        this.textInstruct.str = Z.STR.SAIL_TO_CS;
    } else {
        this.textInstruct.str = Z.STR.SAIL_TO_BSW;
    }
};

Z.Game.prototype.detectArrival = function() {
    var ferryAtTarget, ferry = this.ferry;
    ferryAtTarget = ferry.point.distanceTo(this.getTarget().point) < 7;
    if (ferryAtTarget && ferry.speed < ferry.floatSpeed * 10) {
        this.switchTarget();
        this.textHeader.str = Z.STR.GOOD_JOB;
        this.textMessage.str = Z.STR.SAIL_OPPOSITE;
        window.setTimeout(function() {
            this.textHeader.str = this.textMessage.str = '';
        }.bind(this), 4000);
    }
};

Z.Game.prototype.setFerryAtTarget = function() {
    this.ferry.speed = 0;
    if (this.gotoCS) {
        this.ferry.radian += Math.PI;
    } else {
        this.ferry.radian += Math.PI;
    }
};

Z.Game.prototype.switchTarget = function() {
    this.score++;
    this.textScore.str = Z.STR.UI_SCORE + this.score;
    Z.audio.playScore();
    this.ferry.path = null;
    this.setFerryAtTarget();
    this.gotoCS = !this.gotoCS;
    this.target = this.getTargetEntity();
    this.updateInstruction();
    this.detectLevelUp();
    this.ignoreInput = true;
    window.setTimeout(function() {
        this.ignoreInput = false;
    }.bind(this), 2000);
};

Z.Game.prototype.detectLevelUp = function() {
    if (0 === this.score % 2) {
        this.level++;
        Z.audio.playLevel();
        this.textLevel.str = Z.STR.UI_LEVEL + this.level;
        this.textHeader.str = Z.STR.LEVEL_UP;
    }
};

/**
 * @param {Array.<Z.Point>} points
 */
Z.Game.prototype.updateFerryPath = function(points) {
    if (this.ignoreInput) {
        return;
    }
    var ferry = this.ferry, radianToPoint, delta;
    radianToPoint = ferry.point.radianTo(points[0]);
    delta = Z.util.getRadianDelta(ferry.radian, radianToPoint);
    if (points.length <= 3 && Math.abs(delta) > Math.PI * 0.9) {
        ferry.speed = Math.max(ferry.speed - 0.3, ferry.floatSpeed);
    } else {
        ferry.path = new Z.Path(points);
    }
};

Z.Game.prototype.detectCrash = function() {
    var result;

    if (!this.ferry.ready) {
        return;
    }

    result = this.intersectHandler.hasIntersect(this.ferry, this.traffic.boats);
    if (result) {
        this.textMessage.str = Z.STR.TIP_CRASH_BOAT;
    }
    if (!result) {
        result = this.intersectHandler.hasIntersect(this.ferry, this.shore.segments);
        if (result) {
            this.textMessage.str = Z.STR.TIP_BREAK_FERRY;
        }
    }

    if (result) {
        Z.canvas.err = true;
        Z.audio.playCrash();
        Z.canvas.paintCrash(result.point);

        this.textHeader.str = Z.STR.GAME_OVER;
        this.ignoreInput = true;

        Z.canvas.canvas.onclick = function() {
            window.location.reload(false);
        };
    }
};
