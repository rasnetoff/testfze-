// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// remove user from group
export default (st, userId) => {
  console.log(); output('sendPrivGrpKick');

  const userName = st.userIds[userId].userName;

  const type = auth.AOCP.PRIVGRP_KICK;
  const spec = [
    ['I', userId]
  ];
  st.socket.write(auth.assemble_packet(type, pack.pack(spec)));
  output('Removed from priv group ', userName);
}
