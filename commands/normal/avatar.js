const COLORSHEX = [
  0x46A030,
  0x2B54CE,
  0x00FFFF,
  0xFF0000,
  0xFFFF00,
  0xFF8000,
  0x9932CC
];

module.exports = {
  desc: "Sends someone's avatar url.",
  usage: "<@username> or nothing",
  aliases: ['ava', 'pfp', 'avi'],
  cooldown: 5,
  task(bot, msg) {
    let choice = ~~(Math.random() * COLORSHEX.length);
    if(msg.mentions.length === 1) {
      var id = msg.channel.guild.members.get(msg.mentions[0].id);
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: COLORSHEX[choice],
          author: {
            name: `${id.username}'s Avatar:`,
            url: `${msg.mentions[0].avatarURL}`,
            icon_url: ``
          },
          description: `**URL: ${msg.mentions[0].avatarURL}**`,
          image: {
            url: `${msg.mentions[0].avatarURL}`
          }
        }
      })
    }
    else {
      bot.createMessage(msg.channel.id, { content: ``,
        embed: {
          color: COLORSHEX[choice],
          author: {
            name: `Your Avatar:`,
            url: `${msg.author.avatarURL}`,
            icon_url: `${msg.author.avatarURL}`
          },
          description: `**URL: ${msg.author.avatarURL}**`,
          image: {
            url: `${msg.author.avatarURL}`
          }
        }
      })
    }
  }
};
