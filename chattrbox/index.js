/*var http = require('http');
var fs = require('fs');
var extract = require('./extract');
var wss = require('./websockets-server');
var handleError = function(err, res) {
 res.writeHead(404);
 res.end();
};
var server = http.createServer(function(req, res) {
 console.log('Responding to a request.');
 var filePath = extract(req.url);
 fs.readFile(filePath, function(err, data) {
   if (err) {
     handleError(err, res);
     return;
   } else {
     res.end(data);
   }
 });
});
server.listen(3000); */


/*const express = require('express')
const app = express()
app.get('/', function (req, res) {
 res.sendFile(__dirname + '/index.html');
 res.send('Hello World!')
 app.use(express.static('app'))
})

app.listen(3000, function () {
 console.log('Example app listening on port 3000!')
})*/


const express = require('express')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
 res.sendFile(__dirname + '/index.html');
 app.use(express.static('app'))
});

io.on('connection', function(socket){
 console.log('a user connected');
 socket.on('disconnect', function(){
   console.log('user disconnected');
 });
});
io.on('connection', function(socket){
 socket.on('chat message', function(msg){
   console.log('message: ' + msg);
 });
});
io.emit('some event', { for: 'everyone' });
io.on('connection', function(socket){
 socket.broadcast.emit('hi');
});
io.on('connection', function(socket){
 socket.on('chat message', function(msg){
   io.emit('chat message', msg);
 });
});

http.listen(3000, function(){
 console.log('listening on *:3000');
});
