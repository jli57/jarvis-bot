exports.run = (client, message, args) => {
  message.channel.send({
    files: ["https://cdn.discordapp.com/attachments/307999921926045698/479445750833479692/dog.jpg"]
  }).catch(console.error);
}
