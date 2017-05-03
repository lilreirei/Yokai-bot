const request = require('request-promise');
const catgirls = require('../../catgirls.json');

module.exports = {
  desc: "Posts a random catgirl.",
  aliases: ['neko', 'nekos', 'catgirls'],
  cooldown: 5,
  task(bot, msg, args) {
    try {
      var response = catgirls[Math.floor(Math.random() * catgirls.length)];
      if (response.includes("/a/")) { // If image is an album.
        bot.createMessage(msg.channel.id, {
          content: ``,
          embed: {
            color: 0xf4ce11,
            author: {
              name: `${msg.author.username} requested a catgirl`,
              url: `${msg.author.avatarURL}`,
              icon_url: `${msg.author.avatarURL}`
            },
            description: `**URL:\r\n${response}**`,
            image: {
              url: `${response}`
            }
          }
        });
      } else {
        bot.createMessage(msg.channel.id, {
          content: ``,
          embed: {
            color: 0xf4ce11,
            author: {
              name: `${msg.author.username} requested a catgirl`,
              url: `${msg.author.avatarURL}`,
              icon_url: `${msg.author.avatarURL}`
            },
            description: `**URL: ${response}**`,
            image: {
              url: `${response}`
            }
          }
        });
      }
    } catch (err) {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `Oh dear! Looks like that request failed...`,
          fields: [{
            name: `For support join:`,
            value: `https://discord.gg/Vf4ne5b`,
            inline: true
          }]
        }
      });
    }
  }
}
