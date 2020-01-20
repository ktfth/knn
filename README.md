# K nearest neighbor for objects

[![Build Status](https://travis-ci.org/kaiquewdev/knn.svg?branch=master)](https://travis-ci.org/kaiquewdev/knn)

## Description

    let k = require('./lib/index');

    let center = { a: 1, b: 2 },
        neighbor = { a: 1, c: 4 },
        neighbors = [
          {a: 1, c: 5, d: 3},
          {a: 1, c: 4}
        ];

    k.neighbor( center, neighbor ); // return 2 for distance from center to neighbor

    neighbor = { a: 1, b: 2 };

    k.neighbor( center, neighbor ); // return 0 for distance from center to neighbor

    k.neighbors( center, neighbors ); // see how it works
