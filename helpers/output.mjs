/**
 * Creates console.log output with UTC timestamp
 *
 * @values set of arguments to pass to console.log
 *
 * @returns {undefined}
 */
export default function output (...args) {
  console.log(new Date().toISOString(), ' :: ', ...args);
}
