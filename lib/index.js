'use strict';
var root = exports;

var distance = root.distance = function ( a, b ) {
    var i = Math.min(a.length, b.length),
        d = 0, k = null;

    while ( i-- ) {
        k = b[i] - a[i];
        d += k * k;
    }

    return d;
};

var keys = root.keys = function ( o ) {
    return Object.keys.call( 
        this, o 
    );
};

var values = root.values = function ( o ) {
    var out = [], c = 0,
        v = null, oKeys = keys( o ),
        l = oKeys.length;

    while ( c < l && ( v = o[ oKeys[c] ] ) ) {
        out.push( v );
        c += 1;
    }

    return out;
};

var duplicity = root.duplicity = function ( o ) {
    var out = [], c = 0,
        v = null, l = o.length;

    while ( c < l && ( v = o[ c ] ) ) {
        if ( out.indexOf( v ) === -1 ) {
            out.push( v );
        }

        c += 1;
    }

    return out;
};


