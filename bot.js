const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

client.on("ready", () => {
  console.log("I am ready!");
});

const prefix = config.prefix;
client.on("message", (message) => {
  // Exit and stop if it's not there
  if (message.author.bot) return;
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === 'ping') {
    message.channel.send('Pong!');
  } else
  if (command ===  "foo" ) {
    message.channel.send("bar!");
  } else
  if (command === "asl") {
    let [age, sex, location] = args;
    message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. I'm a cute anime grill, wanna date?`);
  } else
  if (command == "ask") {
    let [user] = args;
    if (user == "<@193555132212969472>" || user == `<@${config.ownerID}>` ) {
      message.channel.send(`I'm too shy~ kyaaaa~ ${message.author.username}`);
      return;
    }
    message.channel.send(`Hello ${user}, I'm a cute anime grill, wanna date?`);
  } else
  if (command === "jing" ) {
    message.channel.send("My master is away now <@" + config.ownerID+ ">");
  } else
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
  }
});

client.login(config.token)
