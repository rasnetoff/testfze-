// UTC time stamped console output
import output from '../../helpers/output';
import formatName from '../../helpers/formatName';

// sending pms and pgms
import sendPM from '../actions/sendPM';
import sendPGM from '../actions/sendPGM';

import givePoints from '../state/givePoints';

export default st => (userId, cmd, channel = false) => {
  output('points command');

  // user who did request
  const userName = st.userIds[userId].userName;

  // array of parameters
  const params = cmd.split(' ');
  const words = params.length;

  // !points or !points name
  if (words === 1) {
    let targetName;
    if (params[0] === '') {
      targetName = userName;
    } else {
      targetName = formatName(params[0]);
    }
    const targetId = st.userNames[targetName]
      ? st.userNames[targetName]
      : undefined;

    if (targetId) {
      const points = st.userIds[targetId].points || 0;

      let response;
      if (points) {
        response = targetName + ' has ' + points + ' points.';
      } else {
        response = targetName + ' has 0 points.';
      }

      !channel
        ? sendPM(st, userId, response)
        : sendPGM(st, channel, response);

    } else {

      !channel
        ? sendPM(st, userId, 'Unknown user')
        : sendPGM(st, channel, 'Unknown user');
    }
    return undefined;
  }

  // !points give name 5 reason
  // if next parameter is give, check permission levels, and update state
  if (params[0] === 'give' || params[0] === 'add') {
    output('points command > add points');
    try {
      // check admin list
      if (!st.admins[userName]) {
        !channel
          ? sendPM(st, userId, 'You do not have admin/mod permission')
          : sendPGM(st, channel, userName + ' does not have admin/mod permission');

        return undefined;
      }

      const targetName = formatName(params[1]);

      const targetId = st.userNames[targetName]
        ? st.userNames[targetName]
        : undefined;
      const amount = parseInt(params[2]);
      const reason = params.slice(3, words).join(' ');

      // if target name provided and known update points
      if (targetId && !isNaN(amount)) {

        const response = givePoints(st, userId, targetId, amount, reason);

        !channel
          ? sendPM(st, userId, response)
          : sendPGM(st, channel, response);

      } else if (!targetId) {
        !channel
          ? sendPM(st, userId, 'Unknown user')
          : sendPGM(st, channel, 'Unknown user');
      } else {
        throw new Error('target id or amount not provided correctly');
      }

      return undefined; // terminate function

    } catch (err) {
      output('Error during point request from', userName);
      output(err);
    }
  }

  !channel
    ? sendPM(st, userId, 'Invalid format: !points or !points user or !points give|add name number [reason]')
    : sendPGM(st, channel, 'Invalid format: !points or !points user or !points give|add name number [reason]');
};
