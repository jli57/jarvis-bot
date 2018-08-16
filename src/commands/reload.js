exports.run = (client, message, args, config) => {
  if ( message.author.id !== config.ownerID )return message.reply("Only my master can use this command.");
  if (!args || args.length < 1) return message.reply("Must provide a command name to reload.");
  args.forEach( command => {
    delete require.cache[require.resolve(`./${command}.js`)];
    message.channel.send(`The command ${command} has been reloaded.`);
  });
}
