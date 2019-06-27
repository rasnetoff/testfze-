import fs from 'fs';

const PATH = './state.json';

// updating state (json file now or later db)
// at moment it just backs up state in file every 5 sec
export default async function updateStateLoop (st) {
  // write to file
  fs.writeFileSync(PATH, JSON.stringify(st, null, 2));

  // time delay
  await new Promise(resolve => setTimeout(resolve, 5000));

  // loop
  updateStateLoop(st);
}
