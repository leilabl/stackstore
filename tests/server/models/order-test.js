var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });

    afterEach('Clear test database', function (done) {
        clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('validation', function() {
        var order;
        beforeEach(function() {
            order = new Order();
        })

        describe()

        // owner validation - test required, test if User
        // item validation:
            // test if Wine is valid
            // must be an array
            // each item must contain valid wine, price, quantity
        // shipping addres:
            // all fields provided
        // shipping rate:
            // defaults to 4.95
            // nothing else besides 4.95 or 12.95
    })

    describe('virtuals', function() {

        // tax
            // returns number between 0 - 1
        // total
            // accurately adds & returns cost of all items, tax, & shipping
            // works with standard shipping
            // works with express shipping
            // works with one item
            // works with multiple items
            // works with quantities other than one

    })

});
