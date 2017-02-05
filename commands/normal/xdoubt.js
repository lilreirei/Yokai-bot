var fs = require('fs');

module.exports = {
	desc: "",
  cooldown: 5,
  aliases: [],
	task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
											file: fs.readFileSync('./images/xDoubt.jpg'),
											name:'xDoubt.jpg'
		}).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
	}
};
