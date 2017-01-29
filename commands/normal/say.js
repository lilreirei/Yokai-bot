module.exports = {
	desc: "Echo",
	usage: "<text>",
	aliases: ['echo'],
	task(bot, msg, suffix) {
		bot.createMessage(msg.channel.id, `:speech_balloon: ${suffix}` || 'echo');
	}
};
