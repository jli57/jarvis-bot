const Jimp = require("jimp");
const fs = require("fs");
const dateFormat = require("dateformat");

exports.run = (client, message, args) => {

  let today = new Date();
  let str = args[args.length-1];

  // parse time, pass in str and return [hour, min]
  const parseTime = require("../utils/parseTime.js");
  let timeStamp = parseTime.run( args[args.length-1], (err) => { if (err) throw err; });
  if ( timeStamp !== null ) args.pop();
  let [hour, min] = timeStamp !== null ? timeStamp : [ 0, 0 ];

  // parse date, pass in str and return [month, day]
  const parseDate = require("../utils/parseDate.js");
  let dateStamp = parseDate.run(args[args.length-1], (err) => { if (err) throw err; });
  if ( dateStamp !== null ) args.pop();
  let [month, day] = dateStamp !==  null ? dateStamp : [ today.getMonth(), today.getDate() ];

  // create new date time
  let evt_date = new Date(today.getFullYear(), month, day, hour, min, 0, 0);

  // add the time remaining to text
  if ( dateStamp !== null || timeStamp !== null ) {
    if (evt_date.getTime() < today.getTime()) return message.channel.send(`Whoopsies, the event is already over.`);
    const dateDiff = require("../utils/dateDiff.js");
    let [ days, hours, mins ] = dateDiff.run( today, evt_date, (err) => { if (err) throw err; });
    args.push("in");
    if ( days > 0 ) args.push(`${days}d`);
    if ( hours >= 0 || mins >= 0) args.push(`${hours}h ${mins}min`);
  }

  // divide words into appropriate lines
  if (args.join(" ").length > 55) return message.channel.send("Your message is too long! Try being more concise.");

  let [x, y, maxChars, maxCharWidth, maxLineHeight, x_center, y_center] = [310, 150, 12, 10, 25, 360,215];
  let lines = args.reduce( (acc, curr, ind) => {
    let last_ind = acc.length-1;
    if ( last_ind >= 0 && acc[last_ind].length + curr.length + 1 < maxChars ) {
      acc[last_ind] = `${acc[last_ind]} ${curr}`;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  let filePath = "./images/brads_reminder.jpg";
  let newFilePath = `./images/brads_reminder_${dateFormat(today, "yyyymmdd_hhMMss")}.jpg`;

  y = y_center - (lines.length* maxLineHeight)/2;

  Jimp.read(filePath).then(image => {
    Jimp.loadFont("./fonts/copperplate_32_black.fnt").then(font => {
      lines.forEach( line => {
        x = x_center - ((line.length*maxCharWidth)/2);
        image.print(font, x, y, line);
        y += maxLineHeight;
      });
      image.write(newFilePath, (err, image) => {
        if (err) throw err;
        message.channel.send({
          files: [{attachment: newFilePath, name: "brads_reminder.jpg"}]
        }).then( msg => {
          fs.unlink(newFilePath, (err) => { if (err) throw err });
        }).catch(console.err);
      });
    });
  });
}
