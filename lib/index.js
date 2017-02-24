'use strict'
const root = exports
const _ = require('lodash')

const distance = root.distance = (a,b) => {
    let i = Math.min(a.length, b.length)
    let d = 0
    let k = null

    while (i--) {
        k = b[i] - a[i]
        d += k * k
    }

    return d
}

const keys = root.keys = o => Object.keys.call(this,o)

const values = root.values = o => {
    let out = []
    let c = 0
    let v = null
    let oKeys = keys( o )
    let l = oKeys.length

    while (c < l && (v = o[oKeys[c]])) {
        out.push(v)
        c += 1
    }

    return out
}

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

var isRegExp = root.isRegExp = function ( v ) {
    return v.constructor.toString().indexOf('RegExp') > -1;
};

var isArray = root.isArray = function ( v ) {
    return v.constructor.toString().indexOf('Array') > -1;    
};

var isObject = root.isObject = function ( v ) {
   return v.constructor.toString().indexOf('Object') > -1; 
};

var hasKey = root.hasKey = function ( o, k ) {
    var out = false,
        obj = detach( o );

    if ( obj.keys.indexOf( k ) > -1 ) {
        out = true;    
    }

    return out;
};

var hasValue = root.hasValue = function ( o, k, v ) {
    var out = false,
        obj = detach( o ),
        kid = obj.keys.indexOf( k ),
        tmpObj = null;

    if ( kid > -1 && !isRegExp( v ) ) {
        out = _.isEqual( obj.values[ kid ], v );    
    } else if ( 
        kid > -1 && isRegExp( v ) &&
        obj.values[ kid ].search( v ) > -1
    ) {
        out = true;    
    }

    return out;
};

var neighbor = root.neighbor = function ( 
    c, n 
) {
    var out = 0,
        _c = c,
        _n = n,
        center = detach( c ),
        neighbor = detach( n ),
        lineC = [
            center.keys.length,
            center.values.length
        ], lineN = [ 0, 0 ],
        c = 0, l = neighbor.keys.length,
        v = null;

    while ( c < l && ( v = neighbor.keys[c] ) ) {
        var nid = neighbor.keys.indexOf( v ),
            val = neighbor.values[ nid ];

        if ( hasKey( _c, v ) ) {
            lineN[0] += 1;
        } if ( hasValue( _c, v, val ) ) {
            lineN[1] += 1;    
        }

        c += 1;
    }

    out = distance( lineC, lineN );
    
    return out;
};

var half = root.half = function ( c, ns ) {
    var out = 0,
        i = 0, l = ns.length, 
        v = null;

    while ( i < l && ( v = ns[ i ] ) ) {
        out += neighbor( c, v );    
        i += 1;
    }

    return ( out / ns.length );
};

var neighbors = root.neighbors = function ( c, ns ) {
    var out = [];

    out = ns.map(function ( n ) {
        var _neighbor = neighbor( c, n );
        return _neighbor;
    });

    return out;
};
