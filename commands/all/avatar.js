module.exports = {
  desc: "Sends someone's avatar url.",
  usage: "<@username> or nothing",
  aliases: ['ava', 'pfp', 'avi'],
  cooldown: 5,
  task(bot, msg, args) {
    let format = '',
      size = 2048;
    const user = this.findMember(msg, args);
    const id = msg.channel.guild.members.get(user.id);
    if (!args) return bot.createMessage(msg.channel.id, {
      content: ``,
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
    if (!user) return bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xff0000,
        author: {
          name: ``,
          url: ``,
          icon_url: ``
        },
        description: `That is not a valid guild member. Need to specify a name, ID or mention the user.`
      }
    })
    bot.createMessage(msg.channel.id, {
      content: ``,
      embed: {
        color: 0xf4ce11,
        author: {
          name: `${id.username}'s Avatar:`,
          url: `${user.dynamicAvatarURL(format, size)}`,
          icon_url: `${user.dynamicAvatarURL(format, size)}`
        },
        description: `**[Click here for direct image link](${user.dynamicAvatarURL(format, size)})**`,
        image: {
          url: `${user.dynamicAvatarURL(format, size)}`
        }
      }
    })
  }
};
