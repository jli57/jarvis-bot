exports.run = (client) => {
  console.log(`Ready to server in ${client.channels.size} channels on ${client.guilds.size}, for a total size of ${client.users.size} users.`);
}
