// UTC time stamped console output
import output from '../../helpers/output';

// import known commands
import commands from '../commands';

// how to handle private messages to bot
export default st => (data, unpacked) => {
  output(); output('handlePM');

  const userId = unpacked.I(); // id of  user who sent pm
  const msg = unpacked.S(); // text user sent
  unpacked.S();
  unpacked.done();

  const userName = st.userIds[userId].userName;

  output('  PM from', userName, ': ' + msg);
  // output('  unknown part:', unknownPart);

  // if it's a command
  if (msg.charAt(0) === '!') {
    const firstWord = msg.split(' ')[0];
    const cmd = firstWord.replace('!', '');
    const cmdParams = msg.split(' ').slice(1).join(' ');
    const cmdHandler = commands(st);

    if (cmd in cmdHandler) {
      cmdHandler[cmd](userId, cmdParams);
    } else {
      output('  not a known command: ' + cmd);
    }

  } else {
    output('  not a command');
  }
};
