// partially adopted from https://github.com/Nepherius/Nephbot/blob/master/system/

import assert from 'assert';

// UTC time stamped console output
import output from '../helpers/output.mjs';

// socket communication
import net from 'net';
const s = new net.Socket();

 // does connection formating & reading (nephbot chat logic)
import auth from '../nephbot/auth.js';
import pack from '../nephbot/pack.js';

import handle from './handle';
const handler = handle(s);

// server settings (TODO: place in separate file)
// found on https://github.com/Budabot/Budabot/blob/master/core/BotRunner.php
// and https://aowiki.de/index.php?title=Server
const HOST = 'chat.d1.funcom.com';
const PORT = '7106';

export default async function initializeBot () {

  output('attempting to connect');

  // connect to server (converting callback in .connect() to promise)
  // (TODO: add reject error and catch)
  await (() => new Promise((resolve, reject) => {
      s.connect(PORT, HOST, () => {
        output('Connection Established!');
        resolve();
      });
  }))();


  // what to do when readable event detected on socket connection
  let remains = new Buffer.alloc(0); // start with null buffer
  s.on('readable', () => {
    output('Readable event!');
    let newlyRead = s.read(); // read new stuff
    remains = Buffer.concat([remains, newlyRead]); // add to unparsed
    while ( parseChunk(remains) ); // parse unparsed remains until done
  });

  // helper for socket data parsing
  function parseChunk ( buf ) {
    const p = auth.parse_packet(buf); // split part of data and type into separate keys

    remains = p.remains; // update remains to only unparsed remains

    if (!p.data) { // if not enough data
      console.log('Partial packet');
      return false; // can stop parsing for now
    }

    console.log("Packet type %d", p.type);
    console.log(p.data.toString('hex'));

    // assign event handling function
    if (p.type in handle(s)) {
      console.log('type key exists in handle');
      handler[p.type](p.data, new pack.Unpacker(p.data));
      // handler should be able to handle unpacked data of this type
    } else {
      console.log("Unknown packet type %d", p.type);
      console.log(p.data.toString('hex'));
    }
    return true; // keep on parsing (until not enough data)
  }

  output('End of initializeBot.mjs');
}
