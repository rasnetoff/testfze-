// UTC time stamped console output
import output from '../../helpers/output';

// sending pms and pgms
import sendPM from '../actions/sendPM';
import sendPGM from '../actions/sendPGM';

export default st => (userId, cmd, channel = false) => {
  output('points command');


  // user who did request
  const userName = st.userIds[userId].userName;

  // array of parameters
  const params = cmd.split(' ');
  const words = params.length;

  // output(params);

  // if no extra paramters or just name, just return number of points
  if (words === 1) {
    let targetName;
    if (params[0] === '') {
      targetName = userName;
    } else {
      targetName = params[0];
    }
    const targetNameFixed =
      targetName.charAt(0).toUpperCase() +
      targetName.slice(1).toLowerCase();
    const targetId = st.userNames[targetNameFixed]
      ? st.userNames[targetNameFixed]
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

      const targetName = params[1];
      const targetNameFixed =
        targetName.charAt(0).toUpperCase() +
        targetName.slice(1).toLowerCase();
      const targetId = st.userNames[targetNameFixed]
        ? st.userNames[targetNameFixed]
        : undefined;
      const amount = parseInt(params[2]);

      // if target name provided and known update points
      if ( targetId && !isNaN(amount) ) {
        // set to 0 if not set yet and falsy
        st.userIds[targetId].points = st.userIds[targetId].points || 0;
        st.userIds[targetId].points += amount;


        const reason = params.slice(3, words).join(' ');

        const response =
          amount + ' pts for ' + targetNameFixed
          + ' from ' + userName + ' ( ' + reason + ' ) '
          + '[balance = ' + st.userIds[targetId].points + ']';
        // output(response);

        !channel
          ? sendPM(st, userId, response)
          : sendPGM(st, channel, response);

        const time = new Date().toISOString();
        const target = st.userIds[targetId];
        target.history || (target.history = []);
        target.history.unshift(time + ' :: ' + response);

        const sender = st.userIds[userId];
        sender.history || (sender.history = []);
        sender.history.unshift(time + ' :: ' + response);

        // console.log(target.history);

      } else if (!targetId) {
        !channel
          ? sendPM(st, userId, 'Unknown user')
          : sendPGM(st, channel, 'Unknown user');
      } else {
        throw 'target id or amount not provided correctly';
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

  // output('points.mjs done \n');
}
