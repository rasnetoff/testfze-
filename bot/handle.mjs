// does connection formating & reading (nephbot communication logic)
import auth from '../nephbot/auth.js';
import pack from '../nephbot/pack.js';

// UTC time stamped console output
import output from '../helpers/output.mjs';

// settings
import settings from '../settings.json';

import assert from 'assert';

// object of response handling functions with events as keys
export default function handle (s) {

  const respondTo = {}; // create object location

  // shorthand
  const Login = settings.User;
  const Pass = settings.Password;

  // when login seed is provided to allow login
  const pack_key = (key) => pack.pack([
    ['I', 0],
    ['S', Login],
    ['S', key]
  ]);
  respondTo[auth.AOCP.LOGIN_SEED] = function (payload) {
    output('LOGIN_SEED detected');
    const seedLength = payload.readInt16BE(0);
    assert.equal(seedLength, payload.length - 2)
    const seed = payload.slice(2)
    output('seed, Login, Pass :: ', seed, Login, Pass);
    const data = pack_key(auth.generate_login_key(seed, Login, Pass));
    var pp = auth.assemble_packet(auth.AOCP.LOGIN_REQUEST, data)

    // broadcast login info based on seed provided to socket
    s.write(pp)
  }

  return respondTo;
}
