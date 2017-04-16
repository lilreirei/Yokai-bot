module.exports = {
	desc: "Echo and deletes the command message.",
	usage: "<text>",
	aliases: ['echod'],
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
		}).then(sentMsg => {
			bot.deleteMessage(sentMsg.channel.id, msg.id);
		})
	}
};
