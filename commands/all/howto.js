const wikihow = require('how-to-what');

module.exports = {
  desc: "Gets articles from wikiHow for random instructions.",
  usage: "[text]",
  cooldown: 5,
  guildOnly: true,
  task(bot, msg, args) {
    wikihow.howTo(args).then(succ => {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `${succ}`
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
