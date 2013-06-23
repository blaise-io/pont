/*jshint globalstrict:true, sub:true*/
/*global Z*/
'use strict';

Z.applyToConstructor = function(constructor, args) {
    var args = [].concat(args);
    var factoryFunction = constructor.bind.apply(constructor, args);
    return new factoryFunction();
};
