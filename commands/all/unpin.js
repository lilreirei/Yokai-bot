module.exports = {
	desc: "Unpins the message with the given message id.",
	usage: "<Message ID>",
	requiredPermission: 'manageMessages',
	task(bot, msg, suffix) {
		var delay = 3000;
		if(!suffix)
		return 'wrong usage'

		bot.unpinMessage(msg.channel.id, suffix).then(sentMsg => {
			bot.createMessage(msg.channel.id, `:white_check_mark: Successfully unpinned the message`)
		})
	}
};
