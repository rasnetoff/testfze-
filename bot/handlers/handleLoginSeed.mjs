// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// settings
import settings from '../../settings.json';

// assert tool
import assert from 'assert';

// when login seed is provided to allow login
export default socket => data => {
  // shorthand
  const login = settings.User;
  const pass = settings.Password;

  output('LOGIN_SEED response');

  const seedLength = data.readInt16BE(0);
  assert.equal(seedLength, data.length - 2); // quick sanity check
  const seed = data.slice(2);

  // assemble packed packet & broadcast
  const spec = pack.pack([
    ['I', 0],
    ['S', login],
    ['S', auth.generate_login_key(seed, login, pass)]
  ])
  const pp = auth.assemble_packet(auth.AOCP.LOGIN_REQUEST, spec);
  socket.write(pp);
}
