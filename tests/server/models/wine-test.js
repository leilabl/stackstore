var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Wine = mongoose.model('Wine');

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

        it('should create a new document', function (done) {

            var wine = new Wine({
                type: "red",
                variety: "Malbec",
                region: "Spain",
                winery: "L&P",
                year: 2016,
            });

            wine.save().then(function (savedWine) {
                expect(savedWine.type).to.equal('red');
                expect(savedWine.variety).to.equal('Malbec');
                expect(savedWine.region).to.equal('Spain');
                expect(savedWine.winery).to.equal('L&P');
                expect(savedWine.year).to.equal(2016);
                expect(savedWine.inventory).to.equal(10);
                expect(savedWine.size).to.equal(750);
                expect(savedWine.image).to.exist;
                // expect(savedWine.displayName).to.equal("2016 L&P - Malbec");
                done();
            }).then(null, done);

        });

        it('has a displayName virtual', function (done) {
            Wine.findOne({ type: 'red' }).exec()
            .then(function(wine) {
                expect(wine.displayName).to.equal('2016 L&P - Malbec');
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

            wine.save().then(function (savedWine) {
                should.not.exist(savedWine);
                done();
            }).then(null, done);

        });


    });

});
