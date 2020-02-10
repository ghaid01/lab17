'use strict';

//subscribe to any published event(logger)

const net = require('net');
const client = new net.Socket();

client.connect(3001, 'localhost', ()=>{});
client.on('data', (data)=>{ //when the data is emitted were gonna grab that data
  let event = JSON.parse(data);
  //   console.log(new Date().toString(), event.event, event.payload);
  console.log(event.payload);
});

client.on('close', ()=>{
  console.log('the connection got closed');
});
