var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Review = mongoose.model('Review');

describe('Review model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Review).to.be.a('function');
    });

    describe('Reviews', function () {

            var review = new Review({
                stars: 4
            });

        it('it should not create a new document if required fields are not passed', function (done) {
            review.validate(function(err) {
                expect(err).to.be.an('object');
                expect(err.message).to.equal('Review validation failed');
                done()
            }) 

        });

    });

});
