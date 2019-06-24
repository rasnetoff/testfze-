// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// how to handle private messages to bot
export default st => (data, unpacked) => {
  console.log(); output('handlePM');

  const userId = unpacked.I();  // id of  user who sent pm
  const text = unpacked.S(); // text user sent
  const unknownPart = unpacked.S();

  const userName = st.userIds ? st.userIds[userId] ? st.userIds[userId].userName : undefined : undefined;

  output('  PM from', userName || userId, ' "' + text + '"');
  output();
  // output('  unknown part:', unknownPart);

  unpacked.done();

  if (text == 'add') {
    // this command calls getUsernameFromUserId to add a buddy
    // then it gets response that's handled by handleBuddyAdd
    // ideally handleBuddyAdd will print the username somewhere
    output('the add keyword detected but does nothing');
  }

  // assemble packed packet with response & broadcast
  // const type = auth.AOCP.MESSAGE_PRIVATE;
  // const response = '<font color=\'#89D2E8\'>' + 'i am here!' + '</font>';
  // const spec = [
  //   ['I', userId],
  //   ['S', response],
  //   ['S', '\0']
  // ];
  // socket.write(auth.assemble_packet(type, pack.pack(spec)));
  // output('message:', response);
  // output('sent to:', userId);

  output('handlePM complete'); console.log();
}
