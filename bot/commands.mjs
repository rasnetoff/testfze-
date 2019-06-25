import points from './commands/points';
import history from './commands/history';

export default st => {
  const knownCommands = {};

  knownCommands['points'] = points(st);

  knownCommands['history'] = history(st);

  return knownCommands;
}
