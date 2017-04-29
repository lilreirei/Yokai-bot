var reload		= require('require-reload')(require),
	cleverbot	= reload('../special/cleverbot.js');

const fs = require('fs');
let points = JSON.parse(fs.readFileSync(`./db/points.json`, 'utf8'));

module.exports = {
	handler(bot, msg, CommandManagers, config, settingsManager) {
		if (msg.author.bot === true)
			return;

		for (let i = 0; i < CommandManagers.length; i++) {
			if (msg.content.startsWith(CommandManagers[i].prefix))
				return CommandManagers[i].processCommand(bot, msg, config, settingsManager);
		}

		if (config.cleverbot && msg.channel.guild === undefined || (msg.mentions.length !== 0 && msg.content.search(new RegExp(`^<@!?${bot.user.id}>`)) === 0))
			cleverbot(bot, msg, config, settingsManager);

			if (!points[msg.author.id]) points[msg.author.id] = {
		    points: 0,
		    level: 0
		  };
		  let userData = points[msg.author.id];
		  userData.points++;

		  let curLevel = Math.floor(0.1 * Math.sqrt(userData.points));
		  if (curLevel > userData.level) {
		    // Level up!
		    userData.level = curLevel;
				let message = JSON.parse(fs.readFileSync(`./db/message.json`, 'utf8'));
				if (config.nowelcomemessageGuild.includes(msg.channel.guild.id)) return;
				if (message[msg.channel.guild.id].type.includes("false")) return;
				if (message[msg.channel.guild.id].type.includes("true")) {
					bot.createMessage(msg.channel.id, `<@${msg.author.id}> You've leveled up to level **${curLevel}**!`);
				}
		  }

			let message = JSON.parse(fs.readFileSync(`./db/message.json`, 'utf8'));
			if (!message[msg.channel.guild.id]) message[msg.channel.guild.id] = {
				type: "true"
			}
			fs.writeFile(`./db/message.json`, JSON.stringify(message), (err) => {
				if (err) console.error(err)
			});

		  fs.writeFile(`./db/points.json`, JSON.stringify(points), (err) => {
		    if (err) console.error(err)
		  });
	},
	reloadCleverbot(bot, channelId) {
		try {
			cleverbot = reload('../special/cleverbot.js');
			bot.createMessage(channelId, "Reloaded special/cleverbot");
		} catch(error) {
			console.error(error);
			bot.createMessage(channelId, `Error reloading cleverbot: ${error}`);
		}
	}
}
