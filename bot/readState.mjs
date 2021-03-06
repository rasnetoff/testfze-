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
    parsedData.Admins = settings.admins;

    // add botName from settings
    parsedData.botName = settings.Botname;

    return parsedData;

  } catch (err) {
    console.log('empty state created as file not found');
    const parsedData = {};
    parsedData.admins = settings.admins;
    return parsedData;
  }
}
