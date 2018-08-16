exports.run = (client, message, args) => {
  message.channel.send({
    files: [{
      attachment: "./images/doge.jpg",
      name: "dog.jpg"
    }]
  }).catch(console.error);
}
