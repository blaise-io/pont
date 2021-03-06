/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

/**
 * @constructor
 */
Z.Intersect = function() {};

/**
 * @param {Z.Entity} entity
 * @param {Array.<Z.Path>} entities
 * @returns {{point:Z.Point, lineA:boolean, lineB:boolean}}
 */
Z.Intersect.prototype.hasIntersect = function(entity, entities) {
    var result;
    for (var i = 0, m = entities.length; i < m; i++) {
        if (entities[i] && entities[i].ready) {
            result = this.isIntersect(entity, entities[i]);
            if (result) {
                return result;
            }
        }
    }
    return null;
};

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
            if (result.lineA && result.lineB) {
                return result;
            }
        }
    }

    return null;
};

/**
 * @param {Z.Entity} entity
 * @returns {Array.<Array.<Z.Point>>}
 */
Z.Intersect.prototype.getLines = function(entity) {
    var lines, angle, point, width, height, sizeMultiplier = 1;

    if (entity.outline) {
        sizeMultiplier = 0.85;
    }

    angle = entity.radian;
    point = entity.point;
    width = (entity.width * entity.scale * sizeMultiplier) / 2; // Allow some scratching
    height = (entity.height * entity.scale * sizeMultiplier) / 2;

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
 * @returns {{point:Z.Point, lineA:boolean, lineB:boolean}}
 */
Z.Intersect.prototype.findLineIntersect = function(a1, a2, b1, b2) {
    var denominator, a, b, numerator1, numerator2, result;

    result = {
        point: null,
        lineA: false,
        lineB: false
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
        result.lineA = true;
    }

    if (b > 0 && b < 1) {
        result.lineB = true;
    }

    return result;
};
