const request = require('request-promise');
const lewd = require('../../lewd.json');
var randomItem = require('random-item');

module.exports = {
  desc: "Lewd.",
  usage: "",
  aliases: [],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg) {
    const gif = randomItem(lewd);
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: ``,
        image: {
          url: `${gif}`
        }
      }
    });
  }
}
