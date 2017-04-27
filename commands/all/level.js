const fs = require('fs');

module.exports = {
  desc: "Get your level and points.",
  cooldown: 5,
  task(bot, msg) {
    let points = JSON.parse(fs.readFileSync(`./db/points.json`, 'utf8'));
    if (!points) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `Couldn't find your data.`
      }
    });
    let userData = points[msg.author.id];

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
        fields: [{
            name: `Level`,
            value: `${userData.level}`,
            inline: true
          },
          {
            name: `Points`,
            value: `${userData.points}`,
            inline: true
          }
        ]
      }
    });
  }
};
