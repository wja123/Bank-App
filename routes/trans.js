'use strict';

var express = require("express");
var router = express.Router();

var Trans = require("../models/tran");

router.get("/", function(req, res) {
    Trans.get((err, data) => {
        if (err) {
            res.status(400).send(err);
            return;
        }
        res.send(data);
    });
});

router.post("/", function(req, res) {
    var addTrans = req.body;
    Trans.newTrans(addTrans, function(err) {
        if (err) {
            res.status(400).send(err);
            return;
        } else {
            res.send();
        }

    });
});

router.put('/:id', function(req, res) {
  var id = req.params.id;
    var addTrans = req.body;
    Trans.update(id, addTrans, function(err) {
        if (err) {
            res.status(400).send(err);
            return;
        } 
        else 
        {
            res.send();
        }

    });
});

router.delete('/:id', function(req, res) {
  var id = req.params.id;
    Trans.delete(id, function(err) {
        if (err) {
            res.status(400).send(err);
            return;
        } 
        else 
        {
            res.send();
        }

    });
});


module.exports = router;