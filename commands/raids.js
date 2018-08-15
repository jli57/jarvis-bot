const fs = require("fs");
let data = JSON.parse(fs.readFileSync("./data.json", "utf8"));

exports.run = (client, message, args) => {
  let cmd = args[0];
  let time = args.slice(1).join(" ");

  if ( cmd === "when" ) {
    if (!data["when"]) {
      message.channel.send(data["default"]);
    } else {
      message.channel.send(`Raids are at: ${data["when"]}`);
    }
  } else if ( cmd === "set" &&
    (message.author.id === message.guild.ownerID || message.author.id === "223990026608967680" )) {
    data["when"] = time
    message.channel.send(`Raids have now been set to occur at ${data["when"]}`);
  } else {
    message.channel.send(`So you want to do aids? Ask <@223990026608967680> or ${message.guild.owner}`);
  }
}
