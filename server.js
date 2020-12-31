var express = require('express');
var path = require('path');
var cors = require('cors');
var morgan = require('morgan');
var bodyparser = require('body-parser');
var http = require('http');
var socketIO = require('socket.io');

var app = express();
var PORT = process.env.PORT || 5000;
app.use(cors());
app.use(bodyparser.json());
app.use(morgan('dev'))

app.get('/signup',(req, res,next)=>{
    res.send('server respose');
})

app.use('/', express.static(path.resolve(path.join(__dirname, 'public'))))

var server = http.createServer(app);
var io = socketIO(server);
var users = [];

io.on('connection',(user)=>{
console.log('user id', user.id);
user.emit('NOTIFICATION','SOME DATA')
users.push(user);
console.log("user count" , users.length)

setTimeout(function(){
users[0].emit("NOTIFICATION", "new message")
}, 10000)

console.log('a user connected');
});


setInterval(function(){
    io.emit('COMMON_TOPIC', 'SOME DATA through set interval :' + new Date().getSeconds())
},3000);

server.listen(PORT, ()=>{
    console.log('server is runining on ', PORT)
})



