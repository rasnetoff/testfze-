// does connection formating & reading (nephbot communication logic)
import auth from '../../nephbot/auth.js';
import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// settings
import settings from '../../settings.json';

// select Botname from account's charlist
export default st => data => {
  console.log(); output('handleLoginCharlist');

  // shorthand
  const botname = settings.Botname;

  // unpack the data for interpretation
  const chars = pack.unpack(data);

  // output(chars);

  // find id of the bot in character list provided
  let botId;
  for (let key in chars) {
    if (key.toLowerCase() === botname.toLowerCase()) {
      output(botname + ' bot character found');
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
}
