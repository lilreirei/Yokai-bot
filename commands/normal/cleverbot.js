var cleverbot = require("cleverbot.io"),
cbot = new cleverbot('FqxpO21tjaYpPyJz','4oZ8IAsSMuQIVLWJ7xCFyEqSvzyEaZgc');
const COLORS = [
    0x2B54CE,
    0xFF8000,
    0x9932CC,
    0x008080,
    0x800080,
    0x808080,
    0xEE82EE,
    0xFFB6C1,
    0x86B3E8,
    0x93FFAA,
    0x979E79
];

module.exports = {
  desc: "Talk with the bot.",
	usage: "<question>",
	aliases: ['cb'],
  task(bot, msg, suffix) {
    let choose = ~~(Math.random() * COLORS.length);
		var color = COLORS[choose];
    cbot.setNick("Shinobu")
    cbot.create(function (err, session) {
      cbot.ask(suffix, function (err, response) {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: color,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `${response}`
          }
        })
      });
    });
  }
}
