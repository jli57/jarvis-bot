const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config-test.json");
const prefix = config.prefix;

// add events
fs.readdir("./events/", (err,files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (command === "crespo" ) {
    message.channel.send("<@223990026608967680>");
  } else
  if (command === "nunu" ) {
    message.channel.send("<@256605450529800192>");
  } else
  if (command === "mexicofrenzy" ) {
    message.channel.send("<@132964999327907842>");
  } else
  if (command === "tsundere" ) {
    message.channel.send("<@158731791400697856>");
  } else {
    try {
      let commandFile = require(`./commands/${command}.js`);
      commandFile.run(client, message, args, config.ownerID.toString());
    } catch (err) {
      console.error(err);
    }
  }
});

client.login(config.token);
