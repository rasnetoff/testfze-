// UTC time stamped console output
import output from '../../helpers/output';

// state helpers
import getName from './getName';

// add points and entry to history in state
export default (st, userId, targetId, amount, reason) => {
  try {
    const userName = getName(userId);
    const targetName = getName(targetId);

    // set these points to 0 if they have no points entry
    st.userIds[targetId].points = st.userIds[targetId].points || 0;
    // give them the points promised
    st.userIds[targetId].points += amount;

    // add entry to history of giver and receiver
    const time = new Date().toISOString();
    const target = st.userIds[targetId]; // shorthand
    target.history || (target.history = []); // initialize if necessary
    const entry =
      amount + ' pts for ' + targetName +
      ' from ' + userName + ' ( ' + reason + ' ) ' +
      '[' + targetName + ' balance = ' + st.userIds[targetId].points + ']';
    target.history.unshift(time + ' :: ' + entry); // add entry to target

    // same entry for giver but in altered color
    const sender = st.userIds[userId];
    sender.history || (sender.history = []);
    sender.history.unshift(
      time + ' :: ' + `<font color='#89D2E8'>Mod/admin action: ` + entry + '</font>'
    ); // add entry to sender

    return entry;

  } catch (err) {
    output('givePoints failed');
    output(err);
  }

  return undefined;
};
