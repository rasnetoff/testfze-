export default (name) => {
  try {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
  } catch (err) {
    console.log(err);
    return '';
  }
};
