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

var detach = root.detach = function ( o ) {
    var out = {};

    out['keys'] = keys( o );
    out['values'] = values( o );

    return out;
};

var merge = root.merge = function ( a, b ) {
    var o = a,
        c = 0, l = b.length,
        v = null;

    while ( c < l && ( v = b[c] ) ) {
        o.push( v );    
        c += 1;
    }

    return duplicity( o );
};

var neighbor = root.neighbor = function ( 
    c, n 
) {
    var out = 0,
        center = detach( c ),
        neighbor = detach( n ),
        c = 0, l = center.keys.length,
        v = null, lineC = [], lineN = [];

    while ( c < l && ( v = center.keys[c] ) ) {
        var nid = neighbor.keys.indexOf( v ),
            nv = null;

        if ( nid > -1 ) {
            nv = center.values[
                center.keys[ nid ]
            ];

            if ( 
                neighbor.values.indexOf( nv ) > -1 
            ) {
                lineN.push( -1 );
            } else {
                lineN.push( 1 );    
            }
        } else {
            lineN.push( 1 );    
        }

        lineC.push( 1 );
        c += 1;
    }

    out = distance( lineC, lineN );
    
    return out;
};
