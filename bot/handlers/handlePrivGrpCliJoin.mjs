// does connection formating & reading (nephbot communication logic)
// import auth from '../../nephbot/auth.js';
// import pack from '../../nephbot/pack.js';

// UTC time stamped console output
import output from '../../helpers/output.mjs';

// how to handle priv group joining
export default st => (data, unpacked) => {
  output(); output('handlePrivGrpCliJoin');

  unpacked.I(); // const botId =
  const userId = unpacked.I();
  unpacked.done();

  const userName = st.userIds[userId].userName;

  output('  ' + userName + ' joined the private channel');
};
