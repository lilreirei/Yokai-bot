const rpun = require('puns');

module.exports = {
  desc: "Sends a random pun.",
  usage: "",
  aliases: [],
  cooldown: 5,
  guildOnly: true,
  task(bot, msg) {
    rpun.getRandomPun().then(pun => {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${pun}`
        }
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
          description: `${err}`,
          fields: [{
            name: `For support join:`,
            value: `https://discord.gg/Vf4ne5b`,
            inline: true
          }]
        }
      });
    });
  }
};
