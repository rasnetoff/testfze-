// partially adopted from https://github.com/Nepherius/Nephbot/blob/master/system/

// UTC time stamped console output
import output from '../helpers/output.mjs';

// socket communication
import net from 'net';
import readState from './readState';

 // does connection formating & reading (nephbot chat logic)
import auth from '../nephbot/auth.js';
import pack from '../nephbot/pack.js';

import handle from './handle';

import updateStateLoop from './updateStateLoop';

// server settings (TODO: place in separate file)
// found on https://github.com/Budabot/Budabot/blob/master/core/BotRunner.php
// and https://aowiki.de/index.php?title=Server
const HOST = 'chat.d1.funcom.com';
const PORT = '7106';

export default async function initializeBot () {
  // read past state from file
  const st = readState();

  // create new connection
  st.socket = new net.Socket(); // add to state
  const socket = st.socket; //short hand
  const handler = handle(st);

  output('Attempting to connect...');
  // connect to server (converting callback in .connect() to promise)
  // (TODO: add reject error and catch)
  await (() => new Promise((resolve, reject) => {
    socket.connect(PORT, HOST, () => {
        output('Connection Established!');
        resolve();
      });
  }))();

  // what to do async when readable event detected on socket connection
  let remains = new Buffer.alloc(0); // start with null buffer
  socket.on('readable', () => {
    // output('Readable event!');
    let newlyRead = socket.read(); // read new stuff
    remains = Buffer.concat([remains, newlyRead]); // add to unparsed
    while ( parseChunk(remains) ); // parse unparsed remains until done
  });

  socket.on('end', () => {
    output('connection was terminated');
  });

  socket.on('connect', () => {
    output('connect event detected');
  });

  socket.on('ready', () => {
    output('ready event detected');
  });

  socket.on('error', () => {
    output('socket error');
  });

  socket.on('close', () => {
    output('socket closed');
  });


  // helper for socket data parsing
  function parseChunk ( buf ) {
    const p = auth.parse_packet(buf); // split part of data and type into separate keys

    remains = p.remains; // update remains to only unparsed remains

    if (!p.data) { // if not enough data
      // output('Partial packet');
      return false; // can stop parsing for now
    }

    // console.log("Packet type # %d", p.type);
    // console.log(p.data.toString('hex'));

    // assign event handling function
    if (p.type in handler) {
      output("Packet type # " + p.type + ' found');
      handler[p.type](p.data, new pack.Unpacker(p.data));
      // handler should be able to handle unpacked data of this type
    } else {
      output("Packet type # " + p.type + ' is currently unspecified');
      // console.log(p.data.toString('hex'));
    }
    return true; // keep on parsing (until not enough data)
  }

  // launch state update loop
  updateStateLoop(st);

  output('End of initializeBot.mjs');
}
