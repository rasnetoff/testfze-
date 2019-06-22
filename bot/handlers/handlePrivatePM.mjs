// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// settings
import settings from '../../settings.json';

// assert tool
import assert from 'assert';

// how to handle private messages to bot
export default socket => (data, unpacked) => {
  const userId = unpacked.I();  // name of  user who sent pm
  const text = unpacked.S(); // text user sent
  const unknownPart = unpacked.S();

  output('userId:', userId);
  output('text:', text);
  output('unknown part:', unknownPart);

  unpacked.done();

  // assemble packed packet with response & broadcast
  const type = auth.AOCP.MESSAGE_PRIVATE;
  const spec = [
        ['I', userId],
        ['S', '<font color=\'#89D2E8\'>' + 'i am here!' + '</font>'],
        ['S', '\0']
  ];
  socket.write(auth.assemble_packet(type, pack.pack(spec)));
  output('response should be sent');
}
