// UTC time stamped console output
import output from '../../helpers/output';
import formatName from '../../helpers/formatName';

// sending pms and pgms
import sendPM from '../actions/sendPM';
import sendPGM from '../actions/sendPGM';

// !history command
export default st => (userId, cmd, channel = false) => {
  output('history command');

  // user who did request
  const userName = st.userIds[userId].userName;

  // array of parameters
  const params = cmd.split(' ');
  const words = params.length;

  let targetName, page;

  // !history
  if (words === 1 && params[0] === '') {
    targetName = userName;
  } else if (words === 1) {
    targetName = formatName(params[0]);
  } else if (words === 2 && !isNaN(parseInt(params[1]))) {
    targetName = formatName(params[0]);
    page = parseInt(params[1]);
  } else {
    !channel
      ? sendPM(st, userId, 'Invalid format: !history user [page]')
      : sendPGM(st, channel, 'Invalid format: !history user [page]');
    return undefined;
  }

  const targetId = st.userNames[targetName]
    ? st.userNames[targetName]
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
      ` !history ` + targetName + ' ' + (page + 1) + `'>next page</a>]`;

    const response = '<a href="text://History for ' + targetName +
      '<br>  page ' + page + ' ' + nextPageLink +
      '<br><br>' + historyCut.join('<br><br>') + '">' +
      targetName + ' History (page ' + page + ')</a> ';

    !channel
      ? sendPM(st, userId, response)
      : sendPGM(st, channel, response);

  } else {
    !channel
      ? sendPM(st, userId, 'Unknown user')
      : sendPGM(st, channel, 'Unknown user');
  }
};
