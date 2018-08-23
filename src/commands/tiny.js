const dateUtils = require("../utils/date.js");

exports.run = (client, message, args) => {
  let today = new Date();
  let evt_date = new Date(today.getFullYear(), 10, 05, 3, 30, 0, 0);
  let str = "";
  if ( today < evt_date) {
    let [ days, hours, mins ] = dateUtils.dateDiff( today, evt_date, 0);
    if ( days > 0 ) str += `${days} days `;
    if ( hours >= 0 || mins >= 0) str += `${hours} hours, and ${mins} minutes`;
    message.channel.send(`${str} before Tiny roams the lands of gw2 again~`);
  }
}
