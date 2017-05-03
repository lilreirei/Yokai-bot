var giphy = require('giphy-api')();

module.exports = {
  desc: "Sends a gif from giphy using your search terms.",
  usage: "<tags> | nothing for absolutely random",
  guildOnly: true,
  cooldown: 5,
  task(bot, msg, args) {
    giphy.random(`${args}`).then(function(res) {
      const imgURL = res.data.image_url;
      if (imgURL === undefined) return bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `Coudn't find any image.`
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
          description: `[Direct image url](${imgURL})
Frames: ${res.data.image_frames}
Width: ${res.data.image_width}
Height: ${res.data.image_height}`,
          image: {
            url: `${imgURL}`
          }
        }
      })
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
