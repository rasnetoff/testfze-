// does connection formating & reading (nephbot communication logic)
import auth from '../nephbot/auth.js';

// handlers
import handleLoginSeed from './handlers/handleLoginSeed';
import handleLoginCharlist from './handlers/handleLoginCharlist';
import handlePM from './handlers/handlePM';
import handleBuddyAdd from './handlers/handleBuddyAdd';
import handleBuddyRemove from './handlers/handleBuddyRemove';
import handleClientName from './handlers/handleClientName';

// object of response handling functions with events as keys
export default function handle (socket) {

  const respondTo = {}; // create object

  // when login seed is provided to allow login
  respondTo[auth.AOCP.LOGIN_SEED] = handleLoginSeed(socket);

  // when char list is returned
  respondTo[auth.AOCP.LOGIN_CHARLIST] = handleLoginCharlist(socket);

  // when bot gets a pm (testing by instantly responding)
  respondTo[auth.AOCP.MESSAGE_PRIVATE] = handlePM(socket);

  // when buddy was added
  respondTo[auth.AOCP.BUDDY_ADD] = handleBuddyAdd(socket);

  // after buddy is removed
  respondTo[auth.AOCP.BUDDY_REMOVE] = handleBuddyRemove(socket);

  // when client name packet is seen (after name added to recent/friends list)
  respondTo[auth.AOCP.CLIENT_NAME] = handleClientName(socket);

  return respondTo;
}
