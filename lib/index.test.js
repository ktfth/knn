'use strict'
const assert = require('assert')
const knn = require('./index')

suite('K-nn', _ => {
  suite('sub', _ => {
    test('positive usage case', () => {
      assert.equal(knn.sub(10,5),5)
    })

    test('negative usage case', () => {
      assert.equal(knn.sub(5,10),-5)
    })
  })

  suite('mul', _ => {
    test('common usage case', () => {
      assert.equal(knn.mul(10,5),50)
    })
  })

  suite('distance', _ => {
    test('close', () => {
      let dist = knn.distance([1, 2],[1, 2])
      assert.equal(dist,0)
    })

    test('away', () => {
      let dist = knn.distance([1,2],[4,5])
      assert.ok(dist > 0)
    })
  })

  suite('value not in seq', _ => {
    test('common usage case', () => {
      assert.ok(knn.valueNotInSeq(4,[1,2,3]))
    })

    test('falsy case for a value in the sequence', () => {
      assert.ok(!knn.valueNotInSeq(3,[1,2,3]))
    })
  })

  suite('Objects and utils', _ => {
    test('keys', () => {
      let a = {a:1,b:2}
      assert.deepEqual(knn.keys(a),['a','b'])
    })

    test('values', () => {
      let a = {a: 1,b: 2}
      assert.deepEqual(knn.values(a),[1,2])
    })

    test('duplicity', () => {
      let a = ['a','b','c','c'] 
      assert.deepEqual(knn.duplicity(a),['a','b','c'])
    })

    test('detach', () => {
      let a = {a:1,b:2}
      let caseObject = knn.detach(a)
      assert.deepEqual(caseObject.keys,['a','b']);
      assert.deepEqual(caseObject.values,[1,2]);
    })
        
    test('merge', () => {
      let a = ['a','b']
      let b = ['b','b','c']
      assert.deepEqual(knn.merge(a,b),['a','b','c'])
    })

    test('isRegExp', () => {
      assert.ok(knn.isRegExp(/simple test/))
    })

    test('isArray', () => {
      assert.ok(knn.isArray([1,2,3]))    
    })

    test('isObject', () => {
      assert.ok(knn.isObject({a:1,b:2,c:3}))
    })

    test('has key', () => {
      let o = {a:1,b:2}
      assert.ok(knn.hasKey(o,'a'));
    })

    test('has value', () => {
      let o = {a:1,b:2,c:'simple test',d:[1,2,3],e:{a:1,b:2,c:3}}    
      assert.ok(knn.hasValue(o,'a',1))
      assert.ok(knn.hasValue(o,'c',/simple/))
      assert.ok(knn.hasValue(o,'d',[1,2,3]))
      assert.ok(knn.hasValue(o,'e',{a:1,b:2,c:3}))
    })
  })

  suite('Neighbor', _ => {
    test('close', () => {
      let c = {a:1,b:2}
      let n = {a:1,b:2}
      assert.equal(knn.neighbor(c,n),0)
    })

    test('away', () => {
      let c = {a:1,b:3}
      let n = {c:2,d:5}
      assert.ok(knn.neighbor(c,n) > 0)
    })

    test('half', () => {
      let c = {a:1,b:2,c:3}
      let n = {d:1,e:5,f:4}
      let o = ((9+9+9+9)/2)
      assert.equal(knn.half(c,[n,n]),o)
    })

    test('approximation', () => {
      assert.equal(knn.approximation('abc','ab'),0.9)
      assert.equal(knn.approximation('abcdefgijklmnop','abcdefghij'))
    })
  })
    
  suite('Neighbors', _ => {
    test('show neighbors', () => {
      let c = {a:1,b:2}
      let cases = [{c:1,b:2},{a:1,b:2},]
      assert.deepEqual(knn.neighbors(c,cases),[2,0])
    })
  })
})
