/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/
var fs = require('fs');
var mongoose = require('mongoose');
var Promise = require('bluebird');
var chalk = require('chalk');
var connectToDb = require('./server/db');
var User = Promise.promisifyAll(mongoose.model('User'));
var Wine = Promise.promisifyAll(mongoose.model('Wine'));


var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            username: 'test'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            username: 'obama'
        },
        {
            email: 'admin@gmail.com',
            password: 'password',
            username: 'admin',
            isAdmin: true
        }
    ];

    return User.createAsync(users);

};



var seedWines = function(){
    var dummyWines = [];

    var files = fs.readdirSync('./db_source');
    for (var file in files) {
        var fileName = files[file];
        var fileContents = fs.readFileSync('./db_source/' + fileName, {encoding: 'utf8'});
        var wineList = JSON.parse(fileContents);
        for (var wine in wineList) {
            dummyWines.push(wineList[wine]);
        }
    }

    return Wine.createAsync(dummyWines);
}

connectToDb.then(function () {
    User.findAsync({}).then(function (users) {
        if (users.length === 0) {
            return seedUsers();
        } else {
            console.log(chalk.magenta('Seems to already be user data, exiting!'));
            // process.kill(0);
        }
    })
    .then(function(){
        return Wine.findAsync({});
    })
    .then(function(wines) {
        if (wines.length === 0) {
            return seedWines();
        } else {
            console.log(chalk.magenta('Seems to already be wine data, exiting!'));
            process.kill(0);
        }
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.kill(0);
    }).catch(function (err) {
        console.error(err);
        process.kill(1);
    });
});
