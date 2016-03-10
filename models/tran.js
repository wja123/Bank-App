'use strict';

var fs = require("fs");
var path = require("path");
var transFilepath = path.join(__dirname, "../data/transactions.json");
var uuid = require("uuid");

var trData = {};

exports.get = function(cb) {

    fs.readFile(transFilepath, (err, data) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        trData = JSON.parse(data);
        cb(null, trData);
    });
}

exports.newTrans = function(addTrans, cb) {

    this.get((err, transData) => {
        trData = transData;
        addTrans.id = uuid();
        trData.push(addTrans);
        this.write(trData, cb);

    });
};

exports.update = function(id, transObj, cb) {
    this.get((err, transData) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        for (var i = 0; i < transData.length; i++) {
            if (transData[i].id === id) {
                for (var key in transObj) {
                    transData[i][key] = transObj[key];
                }
            }
        }
        console.log(transData);
        this.write(transData, cb);
    });
}


exports.delete = function(id, cb) {
    this.get((err, transData) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        for (var i = 0; i < transData.length; i++) {
            if (transData[i].id === id) {
                    transData.splice(i,1);
            }
        }
        console.log(transData);
        this.write(transData, cb);
    });
}


exports.write = function(data, cb) {
    fs.writeFile(transFilepath, JSON.stringify(data), cb);
};