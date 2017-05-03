const catFacts = require('cat-facts');
var request = require('request');

module.exports = {
  desc: "Gives you a random catfact with a cute cat image.",
  usage: "",
  cooldown: 5,
  guildOnly: true,
  aliases: ['catfact'],
  task(bot, msg) {
    let randomFact = catFacts.random();
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
          description: `Woops looks like something bad happened, please try again.`,
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
            name: `Click here for the direct image url`,
            url: `${cat.file}`,
            icon_url: ``
          },
          description: ``,
          thumbnail: {
            url: `${cat.file}`
          },
          fields: [{
            name: `**Cat fact:**`,
            value: `${randomFact}`
          }]
        }
      });
    });
  }
};
