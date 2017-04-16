var fs = require('fs');

module.exports = {
  desc: "Sends Shinobu as a schoolgirl blinking.",
  cooldown: 5,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
                      file: fs.readFileSync('./images/shinobublink.gif'),
                      name:'shinobublink.gif'
    }).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
  }
};