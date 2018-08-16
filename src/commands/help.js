const fs = require("fs");
exports.run = (client, message, args) => {
  fs.readdir("./commands/", (err,files) => {
    if (err) return console.error(err);
    let commandNames = files.map(file => `!${file.split(".")[0]}` ).join(", ");
    message.channel.send(`My commands are: ${commandNames}`);
  });
}
