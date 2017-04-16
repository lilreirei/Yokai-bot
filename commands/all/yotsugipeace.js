var fs = require('fs');

module.exports = {
  desc: "Sends Ononoki Yotsugi peace-peace-ing. (???)",
  cooldown: 5,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
                      file: fs.readFileSync('./images/yotsugipeace.gif'),
                      name:'yotsugipeace.gif'
    }).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
  }
};