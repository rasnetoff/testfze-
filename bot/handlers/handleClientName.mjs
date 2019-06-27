// does connection formating & reading (nephbot communication logic)
// import auth from '../../nephbot/auth.js';
// import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// how to handle client name message
// which happens when id is first looked up by game instance
// can happen after first interaction per session
export default st => (data, unpacked) => {
  output(); output('handleClientName');

  const userId = unpacked.I(); // id of user
  const userName = unpacked.S(); // name of user

  output('userId: ' + userId + ' is userName: "' + userName + '"');
  unpacked.done();

  // add userId/userName pair to state to use easily
  // store user data under userid

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
    output('userId was known');
  }
  st.userIds[userId].userName = userName;

  // create reverse look up hashtable of just id from names
  if (!st.userNames) {
    st.userNames = {};
  }
  st.userNames[userName] = userId;

  // output('\n', st.userIds);

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
  // output('handleClientName complete'); console.log();
};
