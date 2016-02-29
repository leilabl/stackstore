'use strict';

var mongoose = require('mongoose');

// Order

//     Orders must belong to a user OR guest session (authenticated vs unauthenticated)
//     Orders must contain line items that capture the price, current product ID and quantity
//     If a user completes an order, that order should keep the price of the item at the time when they checked out even if the price of the product later changes


var OrderSchema = new mongoose.Schema({

})

mongoose.model('Order', OrderSchema);