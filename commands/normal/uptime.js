var reload = require('require-reload'),
  formatTime = reload('../../utils/utils.js').formatTime;

const COLORSHEX = [
  0x46A030,
  0x2B54CE,
  0x00FFFF,
  0xFF0000,
  0xFFFF00,
  0xFF8000,
  0x9932CC
];

module.exports = {
  desc: "Shows the bots uptime.",
  cooldown: 60,
  task(bot, msg) {
    let choice = ~~(Math.random() * COLORSHEX.length);

    bot.createMessage(msg.channel.id, { content: ``,
      embed: {
        color: COLORSHEX[choice],
        author: {
          name: `Uptime:`,
          icon_url: ``
        },
        description: `:clock1: ${formatTime(bot.uptime)}`
      }
    })
  }
};
