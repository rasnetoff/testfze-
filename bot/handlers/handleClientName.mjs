// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// how to handle client name message
// which happens when id is first looked up by game instance
// can happen after first interaction per session
export default st => (data, unpacked) => {
  console.log(); output('handleClientName');

  const userId = unpacked.I();  // id of user
  const userName = unpacked.S(); // name of user

  output('userId: ' + userId + ' is userName: "' + userName + '"');
  output();
  unpacked.done()

  // add userId/userName pair to state to use easily

  // create userIds object in state if not one there already
  // output('st =');
  // output(st);

  if (!st.userIds) {
    st.userIds = {};
  }
  if (!st.userIds[userId]) {
    st.userIds[userId] = {};
    output('userId was not found but will be added');
  } else {
    output('userId was known and updated');
  }
  st.userIds[userId].userName = userName;

  output('\n', st.userIds);

  // assemble packed packet with response & broadcast
  // const type = auth.AOCP.MESSAGE_PRIVATE;
  // const response = '<font color=\'#89D2E8\'>' + 'i am here!' + '</font>';
  // const spec = [
  //   ['I', userId],
  //   ['S', response],
  //   ['S', '\0']
  // ];
  // socket.write(auth.assemble_packet(type, pack.pack(spec)));
  // output('%s -> %d', response, userId);
  output('handleClientName complete'); console.log();
}
