/**
 * Returns an array of <a></a> strings from within a string
 *
 * @s         String which to convert to array of links
 *
 * @returns   array of links
 */
export default s => {
  const items = []; // start with empty
  for (let i = 0; i < s.length; i++) {
    const tagStart = s.indexOf('<a', i);
    const tagEnd = s.indexOf('/a>', i);
    // if found starting at character i, put into items and update i
    if ((tagStart > -1) && (tagEnd > -1)) {
      items.push(s.substring(tagStart, tagEnd + 3));
      i = tagEnd + 2;
    } else {
      break;
    }
  }
  return items;
};
