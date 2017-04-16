var reload = require('require-reload'),
  formatTime = reload('../../utils/utils.js').formatTime;


module.exports = {
  desc: "Shows the bots uptime.",
  cooldown: 60,
  task(bot, msg) {

    bot.createMessage(msg.channel.id, { content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: `Uptime:`,
          icon_url: ``
        },
        description: `:clock1: ${formatTime(bot.uptime)}`
      }
    })
  }
};
