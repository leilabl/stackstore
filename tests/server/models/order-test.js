var dbURI = 'mongodb://localhost:27017/testingDB';
var clearDB = require('mocha-mongoose')(dbURI);

var sinon = require('sinon');
var expect = require('chai').expect;
var mongoose = require('mongoose');

// Require in all models.
require('../../../server/db/models');

var Order = mongoose.model('Order');
var User = mongoose.model('User');
//var Wine = mongoose.model('Wine');

var successCB = function(done, model, condition) {
    return function() {
        var err = new Error('accepted ' + model + ' with ' + condition);
        done(err);
    }
}

var errorCB = function(done){
    return function(err) {
        expect(err).to.exist;
        done();
    }
}

describe('Order model', function () {

    beforeEach('Establish DB connection', function (done) {
        if (mongoose.connection.db) return done();
        mongoose.connect(dbURI, done);
    });
        // wine1 = new Wine({
        //     type: "red",
        //     winery: "Bodegas Ercavio",
        //     variety: "Tempranillo",
        //     region: "Spain",
        //     year: 2012,
        //     price: 14.00
        //   });
        //  wine2 = new Wine({
        //     type: "red",
        //     winery: "Napa Valley Co.",
        //     variety: "Pinot Noir",
        //     region: "California",
        //     year: 2014,
        //     price: 20.00
        //   });

    afterEach('Clear test database', function (done) {
        Order.remove({}).then(function(){
            done();
        }, done);
        // clearDB(done);
    });

    it('should exist', function () {
        expect(Order).to.be.a('function');
    });

    describe('validation', function() {
    
        var order, user, wine;
        beforeEach('Establish DB connection', function() {
            console.log('running before each');
            user = new User();
            order = new Order({
                owner: user._id,
                items: [],//[{wine: wine1._id, price: wine1.price, quantity: 1},
                        //{wine: wine2._id, price: wine2.price, quantity: 3}],
                shippingAddress: {
                        street: "123 Broadway",
                        city: "New York",
                        state: "NY",
                        zip: "10001"
                }
            });
        });

        describe('owner', function() {

            it('is required', function(done) {
                order.owner = null;
                order.validate()
                .then(successCB(done, 'Order', 'no owner'), errorCB(done))
            })

            it('must be valid user', function(done) {
                order.owner = 'foo';
                order.validate()
                .then(successCB(done, 'Order', 'invalid User'), errorCB(done))
            });

        })

        describe('items', function() {

            it('must be an array', function(done) {
                order.items = 'not an array';
                order.validate()
                .then(successCB(done, 'Order', 'non-array for items'), errorCB(done))

            });

            it('can only contain line item objects', function(done) {
                order.items = [1,2,3];
                order.validate()
                .then(successCB(done), errorCB(done))
            });


        })

        describe('shipping address', function() {

            it('must be a shipping address object', function(done) {
                order.shippingAddress = "123 awesome st";
                order.validate()
                .then(successCB(done, 'Order', 'string for shippingAddress'), errorCB(done))

            })
        })

        describe('shipping rate', function() {

            it('defaults to standard', function() {
                expect(order.shippingRate).to.equal("standard");
            })

            it('cannot be a value other than standard, express or overnight', function(done) {
                order.shippingRate = "extra fast";
                order.validate()
                .then(successCB(done, 'Order', 'invalid shippingRate'), errorCB(done))

            });

        })

    })

    describe('embedded models', function() {

        var order, user, wine;
        beforeEach('Establish DB connection', function() {
            console.log('running before each');
            user = new User();
            order = new Order({
                owner: user._id,
                items: [],//[{wine: wine1._id, price: wine1.price, quantity: 1},
                        //{wine: wine2._id, price: wine2.price, quantity: 3}],
                shippingAddress: {
                        street: "123 Broadway",
                        city: "New York",
                        state: "NY",
                        zip: "10001"
                }
            });
        });

        xdescribe('line item model', function() {

            it('must contain valid instance of wine', function(done) {
                var item = {price: 10.00, quantity: 1};
                order.items.push(item);
                order.validate()
                .then(successCB(done, 'LineItem', 'invalid wine'), errorCB(done))
            });

            it('must have a price', function(done) {
                var item = {quantity: 1};
                order.items.push(item);
                order.validate()
                .then(successCB(done, 'lineItem', 'no price'), errorCB(done))
            });

            it('must have a quantity', function(done) {
                var item = {price: 10.00};
                order.items.push(item);
                order.validate()
                .then(successCB(done, 'lineItem', 'no quantity'), errorCB(done))

            });

            it('cannot have quantity less than 1', function(done) {
                var item = {price: 10.00, quantity: -1};
                order.items.push(item);
                order.validate()
                .then(successCB(done, 'lineItem', 'quantity < 0'), errorCB(done))

            });
        })

        describe('shipping address model', function() {

            it('must have a street', function(done) {
                order.shippingAddress.street = null;
                order.validate()
                .then(successCB(done, 'shippingAddress', 'no street'), errorCB(done))

            });

            it('must have a city', function(done) {
                order.shippingAddress.city = null;
                order.validate()
                .then(successCB(done, 'shippingAddress', 'no city'), errorCB(done))  
            });

            it('must have a state', function(done) {
                order.shippingAddress.state = null;
                order.validate()
                .then(successCB(done, 'shippingAddress', 'no state'), errorCB(done))

            })

            it('only accepts valid state abbreviation', function(done) {
                order.shippingAddress.state = 'California';
                order.validate()
                .then(successCB(done, 'shippingAddress', 'invalid state'), errorCB(done))

            })

            it('must have a zip', function(done) {
                order.shippingAddress.zip = null;
                order.validate()
                .then(successCB(done, 'shippingAddress', 'no zip'), errorCB(done))

            })

            it('must have valid zip code', function(done) {
                order.shippingAddress.zip = "zip code";
                order.validate()
                .then(successCB(done, 'shippingAddress', 'invalid zip'), errorCB(done))

            })
        })
    })

    describe('virtuals', function() {

        var order, user, wine;
        beforeEach('Establish DB connection', function() {
            console.log('running before each');
            user = new User();
            order = new Order({
                owner: user._id,
                items: [],//[{wine: wine1._id, price: wine1.price, quantity: 1},
                        //{wine: wine2._id, price: wine2.price, quantity: 3}],
                shippingAddress: {
                        street: "123 Broadway",
                        city: "New York",
                        state: "NY",
                        zip: "10001"
                }
            });
        });

        describe('tax rate', function() {

            it('returns a number between 0 - 1', function() {
                expect(order.tax).to.be.within(0,1);
            })

        })

        describe('total', function() {

            it('returns cost of items, tax, & shipping', function() {
                order.items.push({price: 10, quantity: 1});
                expect(order.total).to.equal(10 + 4.95 + (10 * order.tax));
            })

            it('works with express shipping', function() {
                order.shippingRate = "express";
                order.items.push({price: 10, quantity: 1});
                expect(order.total).to.equal(10 + 12.95 + (10 * order.tax));
            })

            it('works with no items', function() {
                expect(order.total).to.equal(0);
            })

            it('works with multiple items', function() {
                var item1 = {price: 10, quantity: 1};
                var item2 = {price: 20, quantity: 1};
                order.items = [item1, item2];
                console.log("multiple items" + order.items)
                var total = 30 + 4.95 + (30 * order.tax);
                expect(order.total).to.equal( total );
            });
            
            it('works with quantities larger than one', function() {
                var item = {price: 10, quantity: 10};
                order.items.push(item);
                var total = 100 + 4.95 + (100 * order.tax);
                expect(order.total).to.equal( total );
            });

        });

    });

});
