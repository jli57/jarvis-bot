const Jimp = require("jimp");
const fs = require("fs");
const dateFormat = require("dateformat");

exports.run = (client, message, args) => {

  const dateUtils = require("../utils/date.js");

  let today = new Date();
  let next_sat = new Date();
  next_sat = new Date(next_sat.setDate(next_sat.getDate() + (6 - 1 - next_sat.getDay() + 7) % 7 + 1));

  let evt_date = new Date(next_sat.getFullYear(), next_sat.getMonth(), next_sat.getDay(), 18, 30, 0, 0);


  let lines = ["Guild", "Missions", "in"];
  // add the time remaining to text
  let [ days, hours, mins ] = dateUtils.dateDiff( today, evt_date, 0 );
  if ( days > 0 ) lines.push(`${days}d`);
  if ( hours >= 0 || mins >= 0) lines.push(`${hours}h ${mins}min`);

  // divide words into appropriate lines
  let [x, y, maxChars, maxCharWidth, maxLineHeight, x_center, y_center] = [310, 150, 12, 10, 25, 360,215];

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
