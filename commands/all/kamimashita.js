var fs = require('fs');

module.exports = {
  desc: "Sends Hachikuji Mayoi stuttering.",
  cooldown: 5,
  task(bot, msg) {
    bot.createMessage(msg.channel.id, '', {
                      file: fs.readFileSync('./images/kamimashita.gif'),
                      name:'kamimashita.gif'
    }).then(sentMsg => {
      bot.deleteMessage(sentMsg.channel.id, msg.id);
    })
  }
};