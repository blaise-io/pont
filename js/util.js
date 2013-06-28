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
        return delta;
    }
};
