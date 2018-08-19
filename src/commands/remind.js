const Jimp = require("jimp");
const fs = require("fs");
const dateFormat = require("dateformat");

exports.run = (client, message, args) => {

  const dateUtils = require("../utils/date.js");

  let today = new Date();

  let timeDiff = dateUtils.parseTimeZones(args[args.length-1]);
  if ( timeDiff ) {
    args.pop();
  } else {
    timeDiff = dateUtils.parseTimeZones("CST");
  }

  let timeStamp = dateUtils.parseTime(args[args.length-1]);

  if ( timeStamp !== null ) args.pop();
  let [hour, min] = timeStamp !== null ? timeStamp : [ 0, 0 ];

  let dateStamp = dateUtils.parseDate(args[args.length-1]);
  if ( dateStamp !== null ) args.pop();
  let [month, day] = dateStamp !==  null ? dateStamp : [ today.getMonth(), today.getDate() ];

  // create new date time
  let evt_date = new Date(today.getFullYear(), month, day, hour, min, 0, 0);

  // add the time remaining to text
  if ( dateStamp !== null || timeStamp !== null ) {
    if (evt_date.getTime()+(timeDiff*60*60*1000) < today.getTime()) {
      return message.channel.send({
        files: ["https://i.imgur.com/3LSJxwd.jpg"]
      });
    }
    let [ days, hours, mins ] = dateUtils.dateDiff( today, evt_date, timeDiff );
    args.push("in");
    if ( days > 0 ) args.push(`${days}d`);
    if ( hours >= 0 || mins >= 0) args.push(`${hours}h ${mins}min`);
  }
  //message.channel.send(`${args.join(" ")}`);

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
