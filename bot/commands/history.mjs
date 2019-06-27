// UTC time stamped console output
import output from '../../helpers/output';

// sending pms and pgms
import sendPM from '../actions/sendPM';
import sendPGM from '../actions/sendPGM';

export default st => (userId, cmd, channel = false) => {
  output('history command');

  // user who did request
  const userName = st.userIds[userId].userName;

  // array of parameters
  const params = cmd.split(' ');
  const words = params.length;

  let targetName, page;

  if (words === 1 && params[0] === '') {
    // sendPM(st, userId, 'Invalid format: !history user [page]');
    // return undefined;
    targetName = userName;
  } else if (words === 1) {
    targetName = params[0];
  } else if (words === 2 && !isNaN(parseInt(params[1]))) {
    targetName = params[0];
    page = parseInt(params[1]);
  } else {
    !channel
      ? sendPM(st, userId, 'Invalid format: !history user [page]')
      : sendPGM(st, channel, 'Invalid format: !history user [page]');
    return undefined;
  }

  // output(cmd);
  // output(params);

  const targetNameFixed =
      targetName.charAt(0).toUpperCase() +
      targetName.slice(1).toLowerCase();

  const targetId = st.userNames[targetNameFixed]
    ? st.userNames[targetNameFixed]
    : undefined;

  if (targetId) {
    const history = st.userIds[targetId].history || [];

    page = page || 1;

    const ENTRIES_PER_PAGE = 10;
    const startingIndex = (page - 1) * ENTRIES_PER_PAGE;
    const endingIndex = page * ENTRIES_PER_PAGE;

    const historyCut = history.slice(startingIndex, endingIndex);

    // shorthand
    const botName = st.botName;

    const nextPageLink = `[<a href='chatcmd:///tell ` + botName +
      ` !history ` + targetNameFixed + ' ' + (page + 1) + `'>next page</a>]`;

    const response = '<a href="text://History for ' + targetNameFixed +
      '<br>  page ' + page + ' ' + nextPageLink +
      '<br><br>' + historyCut.join('<br><br>') + '">' +
      targetNameFixed + ' History (page ' + page + ')</a> ';

    !channel
      ? sendPM(st, userId, response)
      : sendPGM(st, channel, response);
  } else {
    !channel
      ? sendPM(st, userId, 'Unknown user')
      : sendPGM(st, channel, 'Unknown user');
  }

  // if no extra paramters, just return number of points
};
