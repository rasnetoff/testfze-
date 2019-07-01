// helpers
import output from '../../helpers/output';
import splitIntoItems from '../../helpers/splitIntoItems';

// sending pms and pgms
import sendPGM from '../actions/sendPGM';
import sendPM from '../actions/sendPM';

// state setters/getters

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

      if (!st.admins[userName]) {
        const issue = userName + ' lacks admin/mod permissions to add loot';
        sendPGM(st, botId, issue);
        throw issue;
      }

      const strItems = params.slice(1, words).join(' ');
      const items = splitIntoItems(strItems);
      output(items);
      sendPM(st, userId, items.join('<br>'));

      st.loot || (st.loot = []); // initiate loot array

    }

  } catch (err) {
    output(err);
  }

};
