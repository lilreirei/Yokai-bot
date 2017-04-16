var fs = require('fs');

module.exports = {
	desc: "Bullshit.",
  cooldown: 5,
  aliases: ['bs'],
	task(bot, msg) {
		bot.createMessage(msg.channel.id, '', {
											file: fs.readFileSync('./images/bs.png'),
											name:'bs.png'
		})
	}
};
