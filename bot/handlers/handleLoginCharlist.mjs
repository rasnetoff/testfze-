// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// select botName from account's charlist
export default st => data => {
  output(); output('handleLoginCharlist');

  // shorthand
  const botName = st.botName;

  // unpack the data for interpretation
  const chars = pack.unpack(data);

  // output(chars);

  // find id of the bot in character list provided
  let botId;
  for (let key in chars) {
    if (key.toLowerCase() === botName.toLowerCase()) {
      output(botName + ' bot character found');
      const i = Object.keys(chars).indexOf(key);
      botId = chars[Object.keys(chars)[i]].id;
      break;
    }
  }

  // assemble packed packet & broadcast
  const spec = pack.pack([
    ['I', botId]
  ]);
  const pp = auth.assemble_packet(auth.AOCP.LOGIN_SELECT, spec);
  st.socket.write(pp);
};
