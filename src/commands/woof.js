exports.run = (client, message, args) => {
  message.channel.send({
    files: ["https://media.discordapp.net/attachments/307999921926045698/479445750833479692/dog.jpg?width=872&height=1163"]
  }).catch(console.error);
}
