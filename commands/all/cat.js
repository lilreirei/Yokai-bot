var request = require('request');

module.exports = {
  desc: "Sends random cat image from http://random.cat",
  usage: "",
  cooldown: 5,
  task(bot, msg, suffix) {
    request("http://random.cat/meow", function(err, response, body) {
      if (err) return bot.createMessage(msg.channel.id, {
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
      var cat = JSON.parse(body);
      if (!cat) return bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `Ewps looks like I couldn't catch a cat for you, please try again.`,
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
            name: `${msg.author.username} requested a cat ;3`,
            url: `${cat.file}`,
            icon_url: ``
          },
          description: `[Click here for the direct image link](${cat.file})`,
          image: {
            url: `${cat.file}`
          }
        },
      });
    });
  }
};
