const lmgtfy = require('lmgtfy');

module.exports = {
  desc: "Let me google that.",
  usage: "<text>",
  cooldown: 5,
  task(bot, msg, args) {
		if (!args) return 'wrong usage';
    let result = lmgtfy(`${args}`);
		if (!result) return bot.createMessage(msg.channel.id, {
			content: ``,
			embed: {
				color: 0xff0000,
				author: {
					name: ``,
					url: ``,
					icon_url: ``
				},
				description: `Ewps couldn't get any results.`
			}
		});
		bot.createMessage(msg.channel.id, {
			content: ``,
			embed: {
				color: 0xf4ce11,
				author: {
					name: ``,
					url: ``,
					icon_url: ``
				},
				description: `:arrow_right: ${result}`
			}
		});
  }
};
