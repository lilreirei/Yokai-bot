var cleverbot = require("cleverbot.io"),
cbot = new cleverbot('FqxpO21tjaYpPyJz','4oZ8IAsSMuQIVLWJ7xCFyEqSvzyEaZgc');

module.exports = {
  desc: "Talk with the bot.",
	usage: "<question>",
	aliases: ['cb'],
  task(bot, msg, suffix) {
    cbot.setNick("Shinobu")
    cbot.create(function (err, session) {
      cbot.ask(suffix, function (err, response) {
        bot.createMessage(msg.channel.id, { content: ``,
          embed: {
            color: 0xf4ce11,
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
