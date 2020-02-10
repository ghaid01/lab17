'use strict';
 
const net = require('net');
const PORT = process.env.PORT || 3001;
const server = net.createServer(); //instead of putting all our code in the net.createServer function //this is creating a server using createServer method 

let socketPool = {}; //user or client 

server.on('connect', (socket)=>{ //client connected to my app
  const id = `socket-${Math.random()}`;
  socketPool[id]=socket;
  socket.on('data', (buffer) => dispatchEvent(buffer));
  socket.on('end', () => delete socketPool([id]));
  socket.on('err', (e) => console.error('ERROR',e));
  socket.on('file-saved', ()=>{console.log(event.payload);});

});

function dispatchEvent(buffer){
  let file = JSON.parse(buffer.toUpperCase().toString().trim());
  broadCast(file);
}



function broadCast(file){
  let payload= JSON.stringify(file);
  for (let socket in socketPool){ //looking at a property in an object
    socketPool[socket].read(payload);
  }
}

server.listen(PORT,()=>{
  console.log(`listening on port ${PORT}`);
});