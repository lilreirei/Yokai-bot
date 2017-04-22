module.exports = {
	desc: "Change the bot's status to streaming.",
	help: "Start with a valid game object `{\"name\": \"\", \"type\": 0, \"url\": \"\"}`",
	usage: "<status object>",
	hidden: true,
	ownerOnly: true,
	task(bot, msg, suffix, config) {
		if (!suffix) return bot.createMessage(msg.channel.id, 'No suffix provided');
		if (suffix.startsWith('{')) {
      config.cycleGames = false;
      bot.editStatus(JSON.parse(suffix.replace(/ *\-f$/, '')));
    } else {
      bot.createMessage(msg.channel.id, 'Baka, you need to do it like:\n\`{\"name\": \"\", \"type\": 0, \"url\": \"\"}\`');
    }
	}
};
