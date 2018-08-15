exports.run = (client, message, args) => {
  let users = message.mentions.users;
  users.forEach( user => {
    let msg = "";
    if ( user.id == "479166313286074378" ) {
    } else if ( user.id == "135616657447059456" ) {
      msg = `I'm too shy to ask my master, kyaaaaa~`;
    } else if ( user.bot ) {
      msg = `I am interested in a real meaningful relationship, not a bot.`;
    } else {
      msg = `${user}, I'm a cute anime grill, wanna date?`;
    }
    message.channel.send(msg).catch(console.error);
  });
}
