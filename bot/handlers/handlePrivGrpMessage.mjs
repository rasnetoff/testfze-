// UTC time stamped console output
import output from '../../helpers/output.mjs';

// import known commands
import commands from '../commands';

// how to handle priv group messages
export default st => (data, unpacked) => {
  output(); output('handlePrivGrpMessage');

  const botId = unpacked.I();
  const userId = unpacked.I();
  const msg = unpacked.S();
  // const unknownPart = unpacked.S();
  unpacked.done();

  const userName = st.userIds[userId].userName;
  const botName = st.botName;

  output('  [' + botName + ']: ', userName, ': ' + msg);

  if (msg.charAt(0) === '!') {
    const firstWord = msg.split(' ')[0];
    const cmd = firstWord.replace('!', '');
    const cmdParams = msg.split(' ').slice(1).join(' ');
    const cmdHandler = commands(st);

    if (cmd in cmdHandler) {
      cmdHandler[cmd](userId, cmdParams, botId);
    } else {
      output('  not a known command: ' + cmd);
    }

  } else {
    // output('  not a command');
  }

};
