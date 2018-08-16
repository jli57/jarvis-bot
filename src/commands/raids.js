const fs = require("fs");
let data = JSON.parse(fs.readFileSync("./data/data.json", "utf8"));

exports.run = (client, message, args, config) => {
  let cmd = args[0];
  let time = args.slice(1).join(" ");
  let guild = message.guild.id;
  let contacts = data[guild]["contacts"];
  let userIDs = [];
  for ( var i in contacts) { userIDs.push(contacts[i]); }
  let users = userIDs.map( userID => `<@${userID}>`).join("/");
  if ( cmd === "when" ) {
    if (!data[guild][cmd]) {
      message.channel.send(data[guild]["default"]);
    } else {
      message.channel.send(`raids are at: ${data[guild][cmd]}`);
    }
  } else if ( cmd === "set" &&
    (message.author.id === message.guild.ownerID || userIDs.indexOf(message.author.id) >= 0 )) {
    data[guild]["when"] = time;
    message.reply(`raids have been set to occur at: ${data[guild]["when"]}`);
  } else {
    message.channel.send(`so you want to do aids? Ask ${message.guild.owner}/${users}`);
  }
}
