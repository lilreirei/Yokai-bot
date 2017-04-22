module.exports = {
  desc: "Kick the mentioned member.",
  usage: "<username | ID | @username>",
  guildOnly: true,
  requiredPermission: 'kickMembers',
  task(bot, msg, args) {
    const user = this.findMember(msg, args);
    if (!args) return 'wrong usage';
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
    });
    msg.channel.guild.members.get(bot.user.id).permission.json.kickMembers
    bot.kickGuildMember(msg.channel.guild.id, user.id).catch(err => {
      var string = `${err}`,
        substring = 'Privilege is too low...';
      if (string.includes(substring)) return bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
          author: {
            name: ``,
            url: ``,
            icon_url: ``
          },
          description: `Can't kick <@${user.id}>, privilege is too low.`
        }
      })
      bot.createMessage(msg.channel.id, {
        content: ``,
        embed: {
          color: 0xff0000,
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
}
