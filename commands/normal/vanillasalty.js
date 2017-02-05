var fs = require('fs');

module.exports = {
  desc: "Sends a random Taiga Aisaka being salty.",
  cooldown: 2,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
			
			file: fs.readFileSync('./images/vanillasalty.png'),
			name:'vanillasalty.png'
		})
  }
}