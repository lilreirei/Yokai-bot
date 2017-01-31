var fs = require('fs');

module.exports = {
	desc: "Send a uno skip card.",
  cooldown: 5,
  aliases: ['us', 'uskip'],
	task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
											file: fs.readFileSync('./images/Skip-Card.png'),
											name:'Skip-Card.png'
		}).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
	}
};
