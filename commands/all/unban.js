module.exports = {
  desc: "Unban a member by id.",
  usage: "<userID>",
  guildOnly: true,
  requiredPermission: 'banMembers',
  task(bot, msg, suffix) {
    if (!suffix) {
      return 'wrong usage'
    }
    else {
      msg.channel.guild.members.get(bot.user.id).permission.json.banMembers
      bot.unbanGuildMember(msg.channel.guild.id, suffix).catch(err => {
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
      })
    }
  }
}
