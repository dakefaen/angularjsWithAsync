var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(__dirname + '/../client'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/../client/index.html'));
});

app.get('/api', function (req, res) {
    let response = 0;
    for (let i = 1; i < 5e8; i++) {
        response += i;
    }
    res.send(response.toString());
});

app.get('/api2', function (req, res) {
    let response = 1;
    for (let i = 1; i < 5e8; i++) {
        response += i;
    }
    res.send(response.toString());
});

app.listen(8080, () => console.log('running...'));