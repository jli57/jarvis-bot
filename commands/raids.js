const fs = require("fs");
let data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

exports.run = (client, message, args) => {
  let cmd = args[0];
  let time = args.slice(1).join(" ");
  let guild = message.guild.id;

  if ( cmd === "when" ) {
    if (!data[guild]) {
      message.channel.send(data["default"]);
    } else {
      message.channel.send(`raids are at: ${data[guild][cmd]}`);
    }
  } else if ( cmd === "set" &&
    (message.author.id === message.guild.ownerID || message.author.id === "223990026608967680" )) {
    data[guild] = { "when" : time };
    message.reply(`raids have been set to occur at: ${data[guild]["when"]}`);
  } else {
    message.channel.send(`so you want to do aids? Ask <@223990026608967680> or ${message.guild.owner}`);
  }
}
