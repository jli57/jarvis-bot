exports.run = (client, message, args, ownerID) => {
  message.channel.send(`My master, <@${ownerID}>, might be away right now.`)
}
