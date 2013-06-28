/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Intersect = function() {};

/*
 * @param {Z.Entity} entityA
 * @param {Z.Entity} entityB
 */
Z.Intersect.prototype.isIntersect = function(entityA, entityB) {
    var linesA, linesB;

    linesA = this.getLines(entityA);
    linesB = this.getLines(entityB);

    for (var a = 0, am = linesA.length; a < am; a++) {
        for (var b = 0, bm = linesB.length; b < bm; b++) {
            var result = this.findLineIntersect(
                linesA[a][0],
                linesA[a][1],
                linesB[b][0],
                linesB[b][1]
            );
            if (result.onLine1 && result.onLine2) {
                Z.canvas.err = true;
                Z.canvas.drawCrashPoint(result.point);
            }
        }
    }
};

/**
 * @param {Z.Entity} entity
 * @returns {Array.<Array.<Z.Point>>}
 */
Z.Intersect.prototype.getLines = function(entity) {
    var lines, angle, point, width, height;

    angle = entity.radian;
    point = entity.point;
    width = (entity.width * entity.scale * 0.95) / 2; // Allow some scratching
    height = (entity.height * entity.scale * 0.95) / 2;

    // T,R,B,L
    lines = [
        [
            point.stepRadian2(angle, -width, -height),
            point.stepRadian2(angle, width, -height)
        ], [
            point.stepRadian2(angle, width, -height),
            point.stepRadian2(angle, width, height)
        ], [
            point.stepRadian2(angle, -width, height),
            point.stepRadian2(angle, width, height)
        ], [
            point.stepRadian2(angle, -width, -height),
            point.stepRadian2(angle, -width, height)
        ]
    ];

    return lines;
};

/**
 * @param {Z.Point} a1
 * @param {Z.Point} a2
 * @param {Z.Point} b1
 * @param {Z.Point} b2
 * @returns {Object}
 */
Z.Intersect.prototype.findLineIntersect = function(a1, a2, b1, b2) {
    var denominator, a, b, numerator1, numerator2, result;

    result = {
        point  : null,
        onLine1: false,
        onLine2: false
    };

    denominator = ((b2.y - b1.y) * (a2.x - a1.x)) - ((b2.x - b1.x) * (a2.y - a1.y));

    if (denominator === 0) {
        return result;
    }

    a = a1.y - b1.y;
    b = a1.x - b1.x;

    numerator1 = ((b2.x - b1.x) * a) - ((b2.y - b1.y) * b);
    numerator2 = ((a2.x - a1.x) * a) - ((a2.y - a1.y) * b);

    a = numerator1 / denominator;
    b = numerator2 / denominator;

    result.point = new Z.Point(
        a1.x + (a * (a2.x - a1.x)),
        a1.y + (a * (a2.y - a1.y))
    );

    if (a > 0 && a < 1) {
        result.onLine1 = true;
    }

    if (b > 0 && b < 1) {
        result.onLine2 = true;
    }

    return result;
};

