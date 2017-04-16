var giphy = require('giphy-api')();

module.exports = {
  desc: "Sends a gif from giphy using your search terms.",
  usage: "<tags> | nothing for absolutely random",
  task(bot, msg, args) {
    giphy.random(`${args}`).then(function(res) {
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `[Direct image url](${res.data.image_url})
Frames: ${res.data.image_frames}
Width: ${res.data.image_width}
Height: ${res.data.image_height}`,
          image: {
            url: `${res.data.image_url}`
          },
          footer: {
            text: `${msg.channel.guild ? (`${msg.channel.guild.name} : #${msg.channel.name}`) : ""}`,
            icon_url: `${msg.channel.guild.iconURL === null ? `` : ''}${msg.channel.guild.iconURL !== null ? msg.channel.guild.iconURL : ''}`
          }
        }
      })
    }).catch(err => {
      bot.createMessage(msg.channel.id, {
        content: ``,
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
};
