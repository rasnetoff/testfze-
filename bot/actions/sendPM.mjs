// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

import output from '../../helpers/output';

export default (st, userId, msg) => {
  const type = auth.AOCP.MESSAGE_PRIVATE;

  const spec = [
    ['I', userId],
    ['S', msg],
    ['S', '\0']
  ];
  st.socket.write(auth.assemble_packet(type, pack.pack(spec)));

  const userName = st.userIds[userId].userName;
  output('Tell sent to ' + userName + ': ' + msg + '\n')

  // const response = '<font color=\'#89D2E8\'>' + 'i am here!' + '</font>';
}