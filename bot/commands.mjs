import points from './commands/points';
import history from './commands/history';
import join from './commands/join';
import leave from './commands/leave';

export default st => {
  const knownCommands = {};

  knownCommands['points'] = points(st);

  knownCommands['history'] = history(st);

  knownCommands['join'] = join(st);

  knownCommands['leave'] = leave(st);

  return knownCommands;
}
