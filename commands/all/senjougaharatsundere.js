var fs = require('fs');

module.exports = {
  desc: "Sends Senjougahara Hitag... Woah...",
  cooldown: 5,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
                      file: fs.readFileSync('./images/senjougaharatsundere.gif'),
                      name:'senjougaharatsundere.gif'
    }).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
  }
};