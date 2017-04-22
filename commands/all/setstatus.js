var reload = require('require-reload'),
	games = reload('../../special/games.json');

module.exports = {
	desc: "Change the bot's status.",
	help: "Start with a valid game object `{\"name\": \"\", \"type\": 0, \"url\": \"\"}` or game `with you`. Avalible flags are:\n\t-f   Force the game to stay the same.\n\t-r   Return to random game cycling, ignoring the input.",
	usage: "<status object | status> [flag]",
	hidden: true,
	ownerOnly: true,
	task(bot, msg, suffix, config) {
		const str = suffix + "";
    const array = str.split(/ ?\| ?/),
      status = array[0],
      game = array[1];
		if (!suffix)
			return bot.createMessage(msg.channel.id, 'No suffix provided');
		if (!game)
			if (suffix.startsWith('{'))
				return bot.editStatus(JSON.parse(suffix.replace(/ *\-f$/, '')));
			if (!suffix.startsWith('{'))
				return bot.editStatus(status, {name: games[~~(Math.random() * games.length)]});
		if (game.endsWith('-r'))
			return bot.editStatus(status, {name: games[~~(Math.random() * games.length)]});
		if (game.endsWith('-f'))
			config.cycleGames = false;
		else
			bot.editStatus(status, {name: game.replace(/ *\-f$/, '')});
	}
};
