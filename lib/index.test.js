var assert = require('assert'),
    knn = require('./index');

suite('K-nn', function () {
    suite('distance', function () {
        test('close', function () {
            var dist = knn.distance(
                [1, 2], 
                [1, 2]
            );    
            assert.equal(
                dist, 0
            );
        });

        test('away', function () {
            var dist = knn.distance(
                [1, 2],
                [4, 5]
            );
            assert.ok(
                dist > 0 
            );
        });
    });

    suite('Objects and utils', function () {
        test('keys', function () {
            var a = {
                a: 1,
                b: 2
            };    

            assert.deepEqual(
                knn.keys(a),
                ['a', 'b']
            );
        });

        test('values', function () {
            var a = {
                a: 1,
                b: 2
            };

            assert.deepEqual(
                knn.values(a),
                [ 1, 2 ]
            );
        });

        test('duplicity', function () {
            var a = ['a', 'b', 'c', 'c'];    

            assert.deepEqual(
                knn.duplicity(a),
                ['a', 'b', 'c']
            );
        });
    });
});
