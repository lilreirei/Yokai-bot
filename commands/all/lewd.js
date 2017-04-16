var fs = require('fs');

module.exports = {
  desc: "Sends an image with lewd.",
  cooldown: 2,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
											file: fs.readFileSync('./images/lewd.jpg'),
											name:'lewd.jpg'
		})
  }
}
