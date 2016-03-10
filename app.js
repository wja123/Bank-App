'use strict';
const PORT = 8000;
var http = require("http");
var path = require("path");
var morgan = require("morgan");
var express = require("express");
var bodyParser = require("body-parser");

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/transactions", require("./routes/trans"));
var server = http.createServer(app);

server.listen(PORT, function() {
    console.log(`Server listening on ${PORT}`);
});