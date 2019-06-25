// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// how to handle a new group channel
export default st => (data, unpacked) => {
  output(); output('handleGroupAnnounce');

  const chBuffer = unpacked.G();
  const channelName = unpacked.S();
  const unknownId = unpacked.I();
  const unknownPart = unpacked.S();
  unpacked.done();

  output('channelName:', channelName);

  // create channels obj in state if not there yet
  st.channels || (st.channels = {});


  st.channels[channelName] = chBuffer;
}
