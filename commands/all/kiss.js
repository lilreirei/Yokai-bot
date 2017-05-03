const request = require('request-promise');
const kiss = require('../../kiss.json');
var randomItem = require('random-item');

module.exports = {
  desc: "Kiss someone.",
  usage: "<username | ID | @username>",
  aliases: ['kisses', 'kissu'],
  cooldown: 2,
  guildOnly: true,
  task(bot, msg, args) {
		const user = this.findMember(msg, args);
    const gif = randomItem(kiss);
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
    });
    if (!gif) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `Sowwy I couldn't find a gif for you :(`,
        fields: [{
          name: `For support join:`,
          value: `https://discord.gg/Vf4ne5b`,
          inline: true
        }]
      }
    });
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `<@${msg.author.id}> **kisses** <@${user.id}>`,
        image: {
          url: `${gif}`
        }
      }
    });
  }
}
