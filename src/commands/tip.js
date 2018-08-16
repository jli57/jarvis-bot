const Jimp = require("jimp");
const fs = require("fs");
const dateFormat = require("dateformat");

exports.run = (client, message, args) => {

  // divide words into appropriate lines
  if (args.join(" ").length > 64) return message.channel.send("Your message is too long! Try being more concise.");

  let [x, y, maxChars, maxCharWidth, maxLineHeight, x_center, y_center] = [0, 0, 35, 28, 68, 500, 920];

  let lines = args.reduce( (acc, curr, ind) => {
    let last_ind = acc.length-1;
    if ( last_ind >= 0 && acc[last_ind].length + curr.length + 1 < maxChars ) {
      acc[last_ind] = `${acc[last_ind]} ${curr}`;
    } else {
      acc.push(curr);
    }
    return acc;
  }, []);

  let today = new Date();
  let filePath = "./images/loading_screen_tips.png";
  let newFilePath = `./images/loading_screen_tips_${dateFormat(today, "yyyymmdd_hhMMss")}.jpg`;

  y = y_center - (lines.length* maxLineHeight)/2;

  Jimp.read(filePath).then(image => {
    Jimp.loadFont(Jimp.FONT_SANS_64_WHITE).then(font => {
      lines.forEach( line => {
        x = x_center - ((line.length*maxCharWidth)/2);
        image.print(font, x, y, line);
        y += maxLineHeight;
      });
      image.write(newFilePath, (err, image) => {
        if (err) throw err;
        message.channel.send({
          files: [{attachment: newFilePath, name: "loading_screen_tips.png"}]
        }).then( msg => {
          fs.unlink(newFilePath, (err) => { if (err) throw err });
        }).catch(console.err);
      });
    });
  });
}
