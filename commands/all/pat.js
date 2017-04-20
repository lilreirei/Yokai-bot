const request = require('request-promise');
const pats = require('../../pats.json');
var randomItem = require('random-item');

module.exports = {
  desc: "Pat someone.",
  usage: "<username | ID | @username>",
  aliases: ['pats'],
  cooldown: 2,
  guildOnly: true,
  task(bot, msg, args) {
    const user = this.findMember(msg, args);
    const gif = randomItem(pats);
    if (!args) return 'wrong usage';
    if (!user) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
      }
    })
    if (user.id === msg.author.id) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `dw <@${msg.author.id}> we all feel lonely sometimes.`,
        image: {
          url: `http://i.imgur.com/DpkNy8N.gif`
        }
      }
    })
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `<@${msg.author.id}> **pats** <@${user.id}>`,
        image: {
          url: `${gif}`
        }
      }
    }).catch(err => {
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${err}`
        }
      })
    });
  }
}
