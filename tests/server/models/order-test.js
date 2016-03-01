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
        var order, user, wine;
        beforeEach(function() {
            user = new User();
            user.save().then(function() {
                order = new Order({
                    owner: user._id,
                    items: [],//[{wine: wine1._id, price: wine1.price, quantity: 1},
                            //{wine: wine2._id, price: wine2.price, quantity: 3}],
                    shippingAddress: {
                            street: "123 Broadway",
                            city: "New York",
                            state: "NY",
                            zip: 10001
                    }
                });
            })
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
        })

        describe('owner', function() {

            it('is required', function(done) {
                order.owner = null;
                order.save().then(function() {
                    var err = new Error('owner should be required');
                    done(err);
                }, function(err){
                    expect(err).to.exist;
                    done()
                })
            })

            it('must be valid user', function() {
                User.remove({_id : user._id})
            })
        })

        xdescribe('items', function() {

            it('must be an array', function() {

            })

            it('can only contain line item objects', function() {

            })


        })

        xdescribe('shipping address', function() {

            it('must be a shipping address object', function() {

            })
        })

        xdescribe('shipping rate', function() {

            it('defaults to 4.95', function() {

            })

            it('cannot be a number other than 4.95 or 12.95', function() {

            })

        })

    })

    xdescribe('embedded models', function() {

        describe('line item model', function() {

            it('must contain valid instance of wine', function() {

            })

            it('must have a price', function() {

            })

            it('must have a quantity', function() {

            })

            it('cannot have quantity less than 1', function() {

            })
        })

        describe('shipping address model', function() {

            it('must have a street', function() {

            })

            it('must have a city', function() {

            })

            it('must have a state', function() {
                
            })

            it('only accepts valid state abbreviation', function() {
                
            })

            it('must have a zip', function() {
                
            })

            xit('must have valid zip code', function() {
                
            })
        })
    })

    xdescribe('virtuals', function() {

        describe('tax rate', function() {

            it('returns a number between 0 - 1', function() {

            })

        })

        describe('total', function() {

            it('returns cost of all items, tax, & shipping', function() {

            })
            
            it('works with standard shipping', function() {

            })
            
            it('works with express shipping', function() {

            })
            
            it('works with one item', function() {

            })

            it('works with no items', function() {

            })

            it('works with multiple items', function() {

            })
            
            it('works with quantities larger than one', function() {

            })

        })

    })

});
