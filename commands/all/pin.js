module.exports = {
	desc: "Pins the message with the given message id.",
	usage: "<Message ID>",
	requiredPermission: 'manageMessages',
	task(bot, msg, suffix) {
		if(!suffix)
		return 'wrong usage'

		bot.pinMessage(msg.channel.id, suffix)
	}
};
