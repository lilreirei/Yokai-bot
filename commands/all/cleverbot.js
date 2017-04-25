var cleverbot = require("better-cleverbot-io"),
  cbot = new cleverbot({
    user: 'FqxpO21tjaYpPyJz',
    key: '4oZ8IAsSMuQIVLWJ7xCFyEqSvzyEaZgc',
    nick: 'Shinobu'
  });

module.exports = {
  desc: "Talk with the bot.",
  usage: "<question>",
  aliases: ['cb'],
  task(bot, msg, suffix) {
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
        /*let embed = {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `:warning: ${err}`
        }*/
        let embed = {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `Cleverbot is currently disabled.`
        }
        bot.createMessage(msg.channel.id, {
          embed: embed
        })
      });
    }).catch(err => {
      /*let embed = {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `:warning: ${err}`
      }*/
      let embed = {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `Cleverbot is currently disabled.`
      }
      bot.createMessage(msg.channel.id, {
        embed: embed
      })
    });
  }
}
