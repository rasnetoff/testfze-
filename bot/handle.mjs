// does connection formating & reading (nephbot communication logic)
import auth from '../nephbot/auth.js';
import pack from '../nephbot/pack.js';

// UTC time stamped console output
import output from '../helpers/output.mjs';

// settings
import settings from '../settings.json';

import assert from 'assert';

// object of response handling functions with events as keys
export default function handle (socket) {

  const respondTo = {}; // create object

  // shorthand
  const Login = settings.User;
  const Pass = settings.Password;
  const Botname = settings.Botname;

  // when login seed is provided to allow login
  respondTo[auth.AOCP.LOGIN_SEED] = payload => {
    output('LOGIN_SEED response');
    const seedLength = payload.readInt16BE(0);
    assert.equal(seedLength, payload.length - 2)
    const seed = payload.slice(2)
    const pack_key = (key) => pack.pack([
      ['I', 0],
      ['S', Login],
      ['S', key]
    ]);
    const data = pack_key(auth.generate_login_key(seed, Login, Pass));
    const pp = auth.assemble_packet(auth.AOCP.LOGIN_REQUEST, data);

    // broadcast packet of login info based on seed provided to socket
    socket.write(pp);
  }

  // when char list is returned
  respondTo[auth.AOCP.LOGIN_CHARLIST] = data => {
    output('LOGIN_CHARLIST response');
    const chars = pack.unpack(data);
    console.log(chars);
    let botId;
    for (let key in chars) {
      if (key.toLowerCase() === Botname.toLowerCase()) {
        console.log(Botname + ' Found');
        const i = Object.keys(chars).indexOf(key);
        botId = chars[Object.keys(chars)[i]].id;
        break;
      }
    }
    const select = pack.pack([
      ['I', botId]
    ]);
    const pp = auth.assemble_packet(auth.AOCP.LOGIN_SELECT, select);
    socket.write(pp);
  }

  // when bot gets a pm (testing by instantly responding)
  respondTo[auth.AOCP.MESSAGE_PRIVATE] = (data, unpacked) => {
    const userId = unpacked.I();
    const text = unpacked.S();
    const unknownPart = unpacked.S();
    unpacked.done();

    const type = auth.AOCP.MESSAGE_PRIVATE;
    const spec = [
          ['I', userId],
          ['S', '<font color=\'#89D2E8\'>' + 'umm, no.' + '</font>'],
          ['S', '\0']
    ];
    socket.write(auth.assemble_packet(type, pack.pack(spec)));
    output('response should be sent');
  }

  return respondTo;
}
