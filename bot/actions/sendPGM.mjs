// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';
import output from '../../helpers/output';

// send private group message
export default (st, botId, msg) => {
  // output(); output('sendPGM');
  const type = auth.AOCP.PRIVGRP_MESSAGE;

  const spec = [
    ['I', botId],
    ['S', `<font color=\'#89D2E8\'>` + msg + '</font>'],
    ['S', '\0']
  ];
  st.socket.write(auth.assemble_packet(type, pack.pack(spec)));

  const botName = st.userIds[botId].userName;

  output('  [' + botName + ']: ', botName, ': ' + msg);
}
