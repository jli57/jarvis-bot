exports.run = (client, message, args, config) => {
  message.channel.send(`My master, <@${config.ownerID}>, might be away right now.`);
}
