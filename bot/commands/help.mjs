// UTC time stamped console output
import output from '../../helpers/output';

// sending pms and pgms
import sendPM from '../actions/sendPM';
import sendPGM from '../actions/sendPGM';

// help info requested
export default st => (userId, cmd, channel = false) => {
  output('help command');

  const help = '<a href="text://Bot Command List<br><br>' +
    '::: User Commands :::<br><br>' +
    '  !join - to join the private chat group for raidbot<br><br>' +
    '  !leave - to leave the private chat group<br><br>' +
    '  !raid or !raid info - request info about raid<br><br>' +
    '  !raid join - to join open raid<br><br>' +
    '  !raid leave - to leave raid<br><br>' +
    '  !history - to get your point history<br><br>' +
    '  !history name [page] - to get point history of a name<br><br>' +
    '  !points - to get your point balance<br><br>' +
    '  !points name- to get point balance of another<br><br>' +
    '::: Admin Commands :::<br><br>' +
    '  !raid start/open raid_name - start raid with raid_name name<br><br>' +
    '  !raid close - stops people from being able to join the raid<br><br>' +
    '  !raid kick name1 name2 ... - kicks all people listed from the raid<br><br>' +
    '  !raid pay amount reason - gives everyone in raid [amount] number of points<br><br>' +
    '  !points give name amount reason - give [amount] points to name<br><br>' +
    '">Rcom Help</a>';

  channel
    ? sendPGM(st, channel, help)
    : sendPM(st, userId, help);
};
