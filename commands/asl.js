exports.run = (client, message, args) => {
  let [age, sex, location] = args;
  message.channel.send(`Hi ${message.author}, I see you are a ${age} year old ${sex} from ${location}. I'm a cute anime grill, wanna date?`).catch(console.error);
}
