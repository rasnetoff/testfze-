// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// add buddy by userId
export default (st, userId) => {
  console.log(); output('sendBuddyAdd');

  const type = auth.AOCP.BUDDY_ADD;
  const spec = [
    ['I', userId],
    ['S', '\u0001']
  ];
  st.socket.write(auth.assemble_packet(type, pack.pack(spec)));
  output('added as buddy:', userId);
};
