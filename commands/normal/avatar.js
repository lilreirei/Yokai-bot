module.exports = {
  desc: "Sends someone's avatar url.",
  usage: "<@username> or nothing",
  aliases: ['ava', 'pfp', 'avi'],
  cooldown: 5,
  task(bot, msg) {
    let format = '',
        size = 2048;
    if(msg.mentions.length === 1) {
      var id = msg.channel.guild.members.get(msg.mentions[0].id);
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: `${id.username}'s Avatar:`,
            url: `${msg.mentions[0].dynamicAvatarURL(format, size)}`,
            icon_url: `${msg.mentions[0].dynamicAvatarURL(format, size)}`
          },
          description: `**[Click here for direct image link](${msg.mentions[0].dynamicAvatarURL(format, size)})**`,
          image: {
            url: `${msg.mentions[0].dynamicAvatarURL(format, size)}`
          }
        }
      })
    }
    else {
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: 0xf4ce11,
          author: {
            name: `Your Avatar:`,
            url: `${msg.author.dynamicAvatarURL(format, size)}`,
            icon_url: `${msg.author.dynamicAvatarURL(format, size)}`
          },
          description: `**[Click here for direct image link](${msg.author.dynamicAvatarURL(format, size)})**`,
          image: {
            url: `${msg.author.dynamicAvatarURL(format, size)}`
          }
        }
      })
    }
  }
};
