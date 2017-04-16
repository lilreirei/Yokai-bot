var fs = require('fs');

module.exports = {
  desc: "Sends Sengoku Nadeko having a terrible time.",
  cooldown: 5,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
                      file: fs.readFileSync('./images/nadekoflustered.png'),
                      name:'nadekoflustered.png'
    }).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
  }
};