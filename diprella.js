async = require('async'), // https://npmjs.org/package/async
    newman = require('newman'), // change to require('newman'), if using outside this repository
    options = {
        collection: 'DiprellaAPI.postman_collection.json', //collection to be run
        environment: 'Diprella.postman_environment.json', //your environment globals: 'postmanBDD.json', //global variables
        reporters: ['cli', 'htmlextra', 'json'],
        timeout: {
            request: 1800000,
            script: 1800000
        },
    },
    parallelCollectionRun = function (done) {
        newman.run(options, done);
    };
async.parallel([parallelCollectionRun,
        parallelCollectionRun, parallelCollectionRun,
        parallelCollectionRun
    ],
    function (err, results) {
        err && console.error(err);
        results.forEach(function (result) {
            var failures = result.run.failures;
            console.info(failures.length ? JSON.stringify(failures.failures, null, 2) : `${result.collection.name} ran successfully.`);
        });
    });