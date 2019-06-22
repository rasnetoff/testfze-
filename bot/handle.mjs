// does connection formating & reading (nephbot communication logic)
import auth from '../nephbot/auth.js';

// handlers
import handleLoginSeed from './handlers/handleLoginSeed';
import handleLoginCharlist from './handlers/handleLoginCharlist';
import handlePrivatePM from './handlers/handlePrivatePM';

// object of response handling functions with events as keys
export default function handle (socket) {

  const respondTo = {}; // create object

  // when login seed is provided to allow login
  respondTo[auth.AOCP.LOGIN_SEED] = handleLoginSeed(socket);

  // when char list is returned
  respondTo[auth.AOCP.LOGIN_CHARLIST] = handleLoginCharlist(socket);

  // when bot gets a pm (testing by instantly responding)
  respondTo[auth.AOCP.MESSAGE_PRIVATE] = handlePrivatePM(socket);

  return respondTo;
}
