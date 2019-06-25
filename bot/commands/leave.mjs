// UTC time stamped console output
import output from '../../helpers/output';

// settings
import settings from '../../settings.json';

// sending pms
import sendPM from '../actions/sendPM';

// remove from private group
import sendPrivGrpKick from '../actions/sendPrivGrpKick';

export default st => (userId, cmd, channel = false) => {
  output('leave command');

  // user who did request
  const userName = st.userIds[userId].userName;

  // array of parameters
  // const params = cmd.split(' ');
  // const words = params.length;

  sendPrivGrpKick(st, userId);
}
