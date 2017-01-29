var fs = require('fs');

module.exports = {
	desc: "That wasn't very kawaii of you.",
  cooldown: 5,
	task(bot, msg) {
		bot.createMessage(msg.channel.id, '', {
											file: fs.readFileSync('./images/notkawaii.gif'),
											name:'notkawaii.gif'
		})
	}
};
