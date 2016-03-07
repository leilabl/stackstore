'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');
var ShippingAddressSchema = require('./order');
var Order = mongoose.model('Order'); 
require('./review');
var Review = mongoose.model('Review');
// var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");

//TW authenticated users vs. guest users?
//TW saw admin mentioned in routes? Other types of users...
//TW guest checkout  
var schema = new mongoose.Schema({
    email: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    paymentMethods: [{
        customerId: String,
        name: String,
        last4: Number
    }],
    shippingMethods: [{
        name: String,
        address: ShippingAddressSchema
    }],
    password: {
        type: String
        //TW sanitize method alternative; 
        //select: false
    },
    salt: {
        type: String
    },
    twitter: {
        id: String,
        username: String,
        token: String,
        tokenSecret: String
    },
    facebook: {
        id: String
    },
    google: {
        id: String
    },
    joinDate: {
        type: Date,
        default: Date.now
    }
});

// method to remove sensitive information from user objects before sending them out
schema.methods.sanitize =  function () {
    return _.omit(this.toJSON(), ['password', 'salt']);
};

schema.methods.findOrders = function () {
    return Order.find({ 
        owner: this._id
    });
}

schema.methods.findReviews = function () {
    return Review.find({
        author: this._id
    });
}

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});

schema.methods.addPaymentMethod = function(data) {
    this.paymentMethods.push(data);
    return this.save();
}

schema.methods.addShippingMethod = function(name, address) {
    this.shippingMethods.push({name: name, address: address});
    return this.save();
}

mongoose.model('User', schema);