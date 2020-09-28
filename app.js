var express = require('express')
var fs = require('fs');

var ex = express();
ex.use(express.static('./public'));

ex.get('/', function (req, res) {
    res.sendFile(__dirname + '/home.html');
});

ex.get('/hard', function (req, res) {
    res.sendFile(__dirname + '/public/TicTacToe-Hard/hard.html');
});

ex.get('/easy', function (req, res) {
    res.sendFile(__dirname + '/public/TicTacToe-Easy/Easy.html');
})

ex.listen(process.env.PORT || 5000);
// var server = http.createServer(function (req, res) {
//     res.writeHead(200, { 'Content-Type': 'text/html' });
//     var readStream = fs.createReadStream(__dirname + '/resource/html/home.html', 'utf8');
//     readStream.pipe(res);
// }).listen(process.env.PORT || 5000);

console.log('online at 127.0.0.1:5000');