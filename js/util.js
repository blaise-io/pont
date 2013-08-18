/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

Z.util = {

    /**
     * @param {number} current
     * @param {number} target
     * @returns {number}
     */
    getRadianDelta: function(current, target) {
        var delta = target - current;
        if (delta > Math.PI) {
            delta -= Math.PI * 2;
        } else if (delta < -Math.PI) {
            delta += Math.PI * 2;
        }
        return delta % Math.PI;
    },

    /**
     * @param {Object} source
     * @param {Object} target
     */
    extend: function (source, target) {
        for (var k in target) {
            if (target.hasOwnProperty(k)) {
                source[k] = target[k];
            }
        }
    },

    /**
     * @param {Function} callback
     */
    onInteraction: function(callback) {
        if ('ontouchstart' in document) {
            document.ontouchstart = callback;
        } else {
            document.onclick = callback;
        }
    }

};
