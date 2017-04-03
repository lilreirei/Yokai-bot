module.exports = {
	desc: "Echo",
	usage: "<text>",
	aliases: ['echo'],
	task(bot, msg, suffix) {
		bot.createMessage(msg.channel.id, { content: ``,
			embed: {
				color: 0xf4ce11,
				author: {
					name: ``,
					url: ``,
					icon_url: ``
				},
				description: `:speech_balloon: ${suffix}` || 'echo'
			}
		});
	}
};
