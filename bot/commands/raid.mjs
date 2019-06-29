// UTC time stamped console output
import output from '../../helpers/output';

// sending pms and pgms
import sendPGM from '../actions/sendPGM';

// state setters/getters
import getId from '../state/getId';
import givePoints from '../state/givePoints';

// raid command
export default st => (userId, cmd, channel = false) => {
  output('raid command');

  // user who did request
  const userName = st.userIds[userId].userName;

  // bot channel to use
  const botName = st.botName;
  const botId = st.userNames[botName];

  // array of parameters
  const params = cmd.split(' ');
  const words = params.length;

  try {
    // create raid object & party if one hasn't been created
    st.raid || (st.raid = {});
    st.raid.party || (st.raid.party = []);

    // !raid or !raid info
    if ((words === 1 && params[0] === '') || (words === 1 && params[0] === 'info')) {
      const linkWords = st.raid.open
        ? (st.raid.name ? '"' + st.raid.name + '" ' : '') +
        'Raid Info (opened by ' + st.raid.leader + ')'
        : st.raid.party.length
          ? 'Raid information (closed)'
          : 'No raid in progress';

      const joinLink =
        `<a href='chatcmd:///tell ` + botName + ` !raid join'>!raid join</a>`;

      const info = '<a href="text://Raid Information<br><br>' +
        'Raid name: ' + st.raid.name + '<br><br>' +
        (
          st.raid.open
            ? 'Open for ' + joinLink
            : st.raid.party.length
              ? 'Closed'
              : 'No raid'
        ) + '<br><br>' +
        'Participants:<br><br>  ' +
        st.raid.party.join('<br>  ') + '">' + linkWords + '</a>';

      sendPGM(st, botId, info);
      output('raid info requested');
    }

    // !raid start (mod/admin)
    if ((params[0] === 'start' || params[0] === 'open')) {

      // stop if not enough permission
      if (!st.admins[userName]) {
        const issue = userName + ' lacks admin/mod permissions to open a raid';
        sendPGM(st, botId, issue);
        throw issue;
      }

      // open up raid for sign ups
      st.raid.open = true;
      st.raid.leader = userName;
      const raidName = words > 1 ? params.slice(1, words).join(' ') : '';
      st.raid.name = raidName;

      // starter auto-joins the raid
      const found = st.raid.party.indexOf(userName);
      if (found === -1) {
        st.raid.party.push(userName);
      }

      // announce start of raid
      const linkToJoin = `[<a href='text://<a href="chatcmd:///tell ` + botName + ` !raid join">Join raid</a>'>Join raid</a>]`;
      const announcement = userName + ' has opened a raid! ' +
        (raidName ? '"' + raidName + '"' : '') + ' ' + linkToJoin;
      output(botName, botId, announcement);
      sendPGM(st, botId, announcement);
    }

    // !raid end or !raid clear
    if ((params[0] === 'end' || params[0] === 'clear') && words === 1) {

      // stop if not enough permission
      if (!st.admins[userName]) {
        const issue = userName + ' lacks admin/mod permissions to end raid';
        sendPGM(st, botId, issue);
        throw issue;
      }

      // announce start of raid
      const announcement = userName + ' has ended the raid';
      output(botName, botId, announcement);
      sendPGM(st, botId, announcement);

      // close raid for sign ups
      st.raid.open = false;
      st.raid.name = '';

      // removes all from raid
      st.raid.party = [];
    }

    // !raid join
    if (params[0] === 'join' && words === 1) {
      // check if already in raid & add to raid if not
      const found = st.raid.party.indexOf(userName);
      if (found === -1) {
        if (st.raid.open) {
          st.raid.party.push(userName);
          const announce = userName + ' added to raid';
          output(announce);
          sendPGM(st, botId, announce);
        } else {
          const announce = `Can't join: raid entry is closed`;
          output(announce);
          sendPGM(st, botId, announce);
        }
      } else {
        const announce = userName + ' already in raid';
        output(announce);
        sendPGM(st, botId, announce);
      }
    }

    // !raid leave
    if (params[0] === 'leave' && words === 1) {
      // check if already in raid & remove from raid if so
      const found = st.raid.party.indexOf(userName);
      if (found === -1) {
        const announce = userName + ' was not in raid';
        output(announce);
        sendPGM(st, botId, announce);
      } else {
        st.raid.party.splice(found, 1);
        const announce = userName + ' removed from raid';
        output(announce);
        sendPGM(st, botId, announce);
      }
    }

    // !raid close
    if (params[0] === 'close' && words === 1) {
      // stop if not enough permission
      if (!st.admins[userName]) {
        const issue = userName + ' lacks admin/mod permissions to close raid';
        sendPGM(st, botId, issue);
        throw issue;
      }

      // close raid for sign ups
      st.raid.open = false;

      // announce it
      const announce = userName + ' closed entry to the raid!';
      output(announce);
      sendPGM(st, botId, announce);
    }

    // !raid kick targetName1 targetName2
    if (params[0] === 'kick') {
      // stop if not enough permission
      if (!st.admins[userName]) {
        const issue = userName + ' lacks admin/mod permissions to kick from raid';
        sendPGM(st, botId, issue);
        throw issue;
      }

      // make sure names provided in right format
      const targetNames = params.slice(1, words);
      targetNames.forEach((eaTargetName, i) => {
        targetNames[i] =
          eaTargetName.charAt(0).toUpperCase() +
          eaTargetName.slice(1).toLowerCase();
      });

      // remove each one from raid
      targetNames.forEach(eaTargetName => {
        const found = st.raid.party.indexOf(eaTargetName);
        if (found > -1) {
          st.raid.party.splice(found, 1);
        }
      });

      const announce = 'Those users were removed from raid by ' + userName;
      output(announce);
      sendPGM(st, botId, announce);
    }

    // !raid pay or !raid reward
    if (params[0] === 'pay' || params[0] === 'reward' || params[0] === 'award') {
      // stop if not enough permission
      if (!st.admins[userName]) {
        const issue = userName + ' lacks admin/mod permissions to award points';
        sendPGM(st, botId, issue);
        throw issue;
      }

      // if next paramter is not a number, ask for number
      const amount = parseInt(params[1]);
      if (isNaN(amount)) {
        const issue = 'Wrong format: !raid pay 3 [reason]';
        sendPGM(st, botId, issue);
        throw issue;
      }

      const reason = params.slice(2, words).join(' ');

      st.raid.party.forEach(targetName => {
        // grab id for each party member
        givePoints(st, userId, getId(targetName), amount, reason);
      });

      const announce =
        'Raid members were awarded ' + amount + ' points each by ' + userName + '!';
      output(announce);
      sendPGM(st, botId, announce);
    }

    output('raid party:', st.raid.party.join(', '));

  } catch (err) {
    output(err);
  }
};
