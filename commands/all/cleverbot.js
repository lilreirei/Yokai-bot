let cleverbot = require("better-cleverbot-io");

module.exports = {
  desc: "Talk with the bot.",
  usage: "<question>",
  aliases: ['cb'],
  task(bot, msg, suffix) {
    let cbot = new cleverbot({
      user: 'FqxpO21tjaYpPyJz',
      key: '4oZ8IAsSMuQIVLWJ7xCFyEqSvzyEaZgc',
      nick: `${msg.channel.guild.id}`
    });
    cbot.create().then(() => {
      cbot.ask(suffix).then((response) => {
        bot.createMessage(msg.channel.id, {
          content: ``,
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
      }).catch(err => {
        bot.createMessage(msg.channel.id, {
          content: ``,
          embed: {
            color: 0xff0000,
            author: {
              name: ``,
              url: ``,
              icon_url: ``
            },
            description: `:warning: ${err}`,
            fields: [{
              name: `For support join:`,
              value: `https://discord.gg/Vf4ne5b`,
              inline: true
            }]
          }
        });
      });
    }).catch(err => {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `:warning: ${err}`,
          fields: [{
            name: `For support join:`,
            value: `https://discord.gg/Vf4ne5b`,
            inline: true
          }]
        }
      });
    });
  }
}
