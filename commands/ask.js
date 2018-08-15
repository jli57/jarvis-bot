exports.run = (client, message, args, config) => {
  let users = message.mentions.users;
  users.forEach( user => {
    let msg = "";
    if ( user.id == client.user.id ) {
      return message.reply(`Are you really asking me to ask myself?`);
    } else if ( user.id == config.ownerID ) {
      msg = `I'm too shy to ask my master, kyaaaaa~`;
    } else if ( user.bot ) {
      msg = `I am interested in a real meaningful relationship, not a robot.`;
    } else {
      msg = `${user}, I'm a cute anime grill, wanna date?`;
    }
    message.channel.send(msg).catch(console.error);
  });
}
