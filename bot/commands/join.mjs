// UTC time stamped console output
import output from '../../helpers/output';

// invite to private group
import sendPrivGrpInvite from '../actions/sendPrivGrpInvite';

export default st => (userId, cmd, channel = false) => {
  output('join command');

  // user who did request
  // const userName = st.userIds[userId].userName;

  // array of parameters
  // const params = cmd.split(' ');
  // const words = params.length;

  sendPrivGrpInvite(st, userId);
};
