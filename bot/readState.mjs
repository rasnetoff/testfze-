import fs from 'fs';

const PATH = './state.json';

// read state
export default function readState () {
  // read file
  // if works, returns old state, otherwise returns empty object
  try {
    const data = fs.readFileSync(PATH);
    const parsedData = JSON.parse(data);
    console.log('state loaded successfully');
    // console.log(parsedData);
    return parsedData;

  } catch (err) {
    console.log('empty state returned, file read error:', err)
    return {};
  }

}
