// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// remove buddy by userId
export default (st, userId) => {
  console.log(); output('sendBuddyRemove');

  const type = auth.AOCP.BUDDY_REMOVE;
  const spec = [
    ['I', userId]
  ];
  socket.write(auth.assemble_packet(type, pack.pack(spec)));
  output('removed as buddy:', userId);
}
