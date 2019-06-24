// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// how to handle private messages to bot
export default st => (data, unpacked) => {
  console.log(); output('handleBuddyRemove');

  const userId = unpacked.I();  // id of user
  unpacked.done();

  output('userId:', userId);
  // output('unknown part:', unknownPart);
  output(unpacked);
}
