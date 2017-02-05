var fs = require('fs');

module.exports = {
  desc: "Sends Taiga Aisaka being salty.",
  cooldown: 5,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
                      file: fs.readFileSync('./images/vanillasalty.png'),
                      name:'vanillasalty.png'
    }).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
  }
};
