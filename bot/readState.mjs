// file system for writing/reading files
import fs from 'fs';

// settings
import settings from '../settings.json';

const PATH = './state.json';

// read state
export default function readState () {
  // read file
  // if works, returns old state, otherwise returns empty object
  try {
    const data = fs.readFileSync(PATH);
    const parsedData = JSON.parse(data);
    console.log('state loaded successfully');

    // add admins from settings
    // parsedData.admins || (parsedData.admins = []);
    // parsedData.admins = [...parsedData.admins, ...settings.admins];
    parsedData.admins = settings.admins;

    return parsedData;

  } catch (err) {
    console.log('empty state returned, file read error:', err)
    return {};
  }

}
