var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var Promise = require('bluebird')

// Require in all models.
require('../../../server/db/models');

var Wine = mongoose.model('Wine');
var Review = mongoose.model('Review');

describe('Wine model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Wine).to.be.a('function');
    });

    describe('Wines', function () {

            var wine = new Wine({
                type: "red",
                variety: "Malbec",
                region: "Spain",
                winery: "L&P",
                year: 2016,
                price: 10
            });


        it('should create a new document', function (done) {

            wine.save().then(function (savedWine) {
                expect(savedWine.type).to.equal('red');
                expect(savedWine.variety).to.equal('Malbec');
                expect(savedWine.region).to.equal('Spain');
                expect(savedWine.winery).to.equal('L&P');
                expect(savedWine.year).to.equal(2016);
                expect(savedWine.inventory).to.equal(10);
                expect(savedWine.size).to.equal(750);
                expect(savedWine.price).to.equal(10);
                expect(savedWine.image).to.exist;
                expect(savedWine.displayName).to.equal("2016 L&P - Malbec");
                done();
            }).then(null, done);

        });

        it('should create reviews', function (done) {

            wine.save().then(function (savedWine) {

                var review1 = new Review({
                    stars: 3,
                    wine: savedWine._id
                });

                var review2 = new Review({
                    stars: 5,
                    wine: savedWine._id
                });

                var saved1 = review1.save();
                var saved2 = review2.save();

                Promise.all([saved1, saved2])
                .then(function(values) {
                    console.log("Promise all values", values)
                });


                // review1.save().then(function(review1) {
                // console.log(savedWine.reviews)
                //     review2.save().then(function(review2) {
                //         console.log('here')
                //         expect(savedWine.reviews).to.equal([review1, review2])
                //     })
                // })

                
                done();
            }).then(null, done);

        });


        it('it should not create a new document if required fields are not passed', function (done) {

            var wine = new Wine({
                variety: "Malbec",
                region: "Spain",
                winery: "L&P",
                year: 2016,
            });

            wine.validate(function(err) {
                expect(err).to.be.an('object');
                expect(err.message).to.equal('Wine validation failed');
                done()
            })

        });


    });

});
