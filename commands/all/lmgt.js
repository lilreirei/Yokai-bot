const lmgt = require('../../node_modules/lmgt/index.js');

module.exports = {
	desc: "Let me google that.",
  usage: "<text>",
	aliases: [],
	cooldown: 5,
	task(bot, msg, suffix) {
    const query = `${suffix}`;
    const result = lmgt(query);
		bot.createMessage(msg.channel.id, { content: ``,
			embed: {
				color: 0xf4ce11,
				author: {
					name: ``,
					url: ``,
					icon_url: ``
				},
				description: `${result}`
			}
		});
	}
};
