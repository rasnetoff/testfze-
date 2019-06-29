// UTC time stamped console output
import output from '../../helpers/output';

// sending pms and pgms
import sendPGM from '../actions/sendPGM';

// state setters/getters
import getId from '../state/getId';
import givePoints from '../state/givePoints';

// loot command
export default st => (userId, cmd, channel = false) => {
  output('loot command');

  // user who did request
  const userName = st.userIds[userId].userName;

  // bot channel to use
  const botName = st.botName;
  const botId = st.userNames[botName];

  // array of parameters
  const params = cmd.split(' ');
  const words = params.length;

  try {

    // !loot
    if (words === 1 && params[0] === '') {

    }

    // !loot add item1 item2 item3
    if (params[0] === 'add') {
      const strItems = params.slice(1, words).join(' ');
      output(params);
      output(strItems);
    }

  } catch (err) {
    output(err);
  }
};
