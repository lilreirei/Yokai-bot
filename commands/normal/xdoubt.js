var fs = require('fs');

module.exports = {
	desc: "Sends x doubt meme",
  cooldown: 5,
	task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
											file: fs.readFileSync('./images/xDoubt.jpg'),
											name:'xDoubt.jpg'
		}).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
	}
};
