// does connection formating & reading (nephbot communication logic)
// import auth from '../../nephbot/auth.js';
// import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// how to handle buddy appearing in offline or online list
export default st => (data, unpacked) => {
  output(); output('handleBuddyAdd');

  const userId = unpacked.I(); // id of user
  const userStatus = (unpacked.I() === 1) ? 'online' : 'offline';
  // const unknownPart = unpacked.S();
  unpacked.done();

  output('userId:', userId);
  output('userStatus:', userStatus);
  // output('unknownPart:', unknownPart);
  output(unpacked);
};
