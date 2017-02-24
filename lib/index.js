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
    let oKeys = keys(o)
    let l = oKeys.length

    while (c < l && (v = o[oKeys[c]])) {
        out.push(v)
        c += 1
    }

    return out
}

const duplicity = root.duplicity = o => {
    let out = []
    let c = 0
    let v = null
    let l = o.length

    while (c < l && (v = o[c])) {
        if (out.indexOf(v) === -1) {
            out.push(v);
        }

        c += 1;
    }

    return out;
}

const detach = root.detach = o => {
    let out = {}

    out['keys'] = keys(o)
    out['values'] = values(o)

    return out
}

const merge = root.merge = (a,b) => {
    let o = a
    let c = 0
    let l = b.length
    let v = null

    while (c < l && (v = b[c])) {
        o.push(v)   
        c += 1
    }

    return duplicity(o)
}

const isRegExp = root.isRegExp = v => v.constructor.toString().indexOf('RegExp') > -1

const isArray = root.isArray = v => v.constructor.toString().indexOf('Array') > -1

const isObject = root.isObject = v => v.constructor.toString().indexOf('Object') > -1

const hasKey = root.hasKey = (o,k) => {
    let out = false
    let obj = detach(o)

    if (obj.keys.indexOf( k ) > -1) {
        out = true
    }

    return out
}

const hasValue = root.hasValue = (o,k,v) => {
    let out = false
    let obj = detach(o)
    let kid = obj.keys.indexOf(k)
    let tmpObj = null

    if (kid > -1 && !isRegExp(v)) {
        out = _.isEqual(obj.values[kid],v)
    } else if ( 
        kid > -1 && isRegExp(v) &&
        obj.values[kid].search(v) > -1
    ) {
        out = true
    }

    return out
}

const neighbor = root.neighbor = ( 
    c, n 
) => {
    let out = 0
    let _c = c
    let _n = n
    let center = detach(c)
    let neighbor = detach(n)
    let lineC = [
            center.keys.length,
            center.values.length
        ]
    let lineN = [0, 0]
    c = 0
    let l = neighbor.keys.length
    let v = null

    while (c < l && (v = neighbor.keys[c])) {
        let nid = neighbor.keys.indexOf(v)
        let val = neighbor.values[nid]

        if (hasKey(_c,v)) {
            lineN[0] += 1
        } if (hasValue(_c,v,val)) {
            lineN[1] += 1
        }

        c += 1
    }

    out = distance(lineC,lineN)
    
    return out
}

const half = root.half = (c,ns) => {
    let out = 0
    let i = 0
    let l = ns.length
    let v = null

    while (i < l && (v = ns[i])) {
        out += neighbor(c, v)    
        i += 1
    }

    return (out / ns.length)
}

const neighbors = root.neighbors = (c, ns) => {
    let out = []

    out = ns.map(n => {
        let _neighbor = neighbor(c,n)
        return _neighbor
    })

    return out
}
