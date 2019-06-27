// does connection formating & reading (nephbot communication logic)
import auth from '../nephbot/auth.js';

// handlers
import handleLoginSeed from './handlers/handleLoginSeed';
import handleLoginCharlist from './handlers/handleLoginCharlist';
import handlePM from './handlers/handlePM';
import handleBuddyAdd from './handlers/handleBuddyAdd';
import handleBuddyRemove from './handlers/handleBuddyRemove';
import handleClientName from './handlers/handleClientName';
// import handleGroupAnnounce from './handlers/handleGroupAnnounce';
import handlePrivGrpCliJoin from './handlers/handlePrivGrpCliJoin';
import handlePrivGrpMessage from './handlers/handlePrivGrpMessage';

// object of connection response handling functions with type as keys
export default function handle (st) {

  const respondTo = {}; // create object

  // when login seed is provided to allow login
  respondTo[auth.AOCP.LOGIN_SEED] = handleLoginSeed(st);

  // when char list is returned
  respondTo[auth.AOCP.LOGIN_CHARLIST] = handleLoginCharlist(st);

  // when bot gets a pm (testing by instantly responding)
  respondTo[auth.AOCP.MESSAGE_PRIVATE] = handlePM(st);

  // when buddy was added
  respondTo[auth.AOCP.BUDDY_ADD] = handleBuddyAdd(st);

  // after buddy is removed
  respondTo[auth.AOCP.BUDDY_REMOVE] = handleBuddyRemove(st);

  // when client name packet is seen (after name added to recent/friends list)
  respondTo[auth.AOCP.CLIENT_NAME] = handleClientName(st);

  // handle new channel found
  // respondTo[auth.AOCP.GROUP_ANNOUNCE] = handleGroupAnnounce(st);

  // handle when someone joins private group
  respondTo[auth.AOCP.PRIVGRP_CLIJOIN] = handlePrivGrpCliJoin(st);

  // handle messages in private channel
  respondTo[auth.AOCP.PRIVGRP_MESSAGE] = handlePrivGrpMessage(st);

  return respondTo;
}
