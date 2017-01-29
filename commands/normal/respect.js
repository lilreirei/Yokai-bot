// respect command (f) $Username$ has paid their respect (string :color_heart:)
const RESPONSES = [
	":heart:",
  ":yellow_heart:",
  ":green_heart:",
  ":blue_heart:",
  ":purple_heart:"
];

var Nf = new Intl.NumberFormat('en-US');

module.exports = {
  desc: "Pay your respect.",
  aliases: ['f'],
  cooldown: 2,
  task(bot, msg, suffix) {
		let choice = ~~(Math.random() * RESPONSES.length);
		if(!suffix)
    	bot.createMessage(msg.channel.id, `**${msg.author.username}** has paid their respect ${RESPONSES[choice]}`);
		else {
    	bot.createMessage(msg.channel.id, `**${msg.author.username}** has paid their respect for **${suffix}** ${RESPONSES[choice]}`);
		}
  }
};
